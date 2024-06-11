package com.jgm.tracer.service.auth.impl;

import com.jgm.tracer.model.User;
import com.jgm.tracer.service.auth.JwtService;
import com.jgm.tracer.service.impl.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtServiceImpl implements JwtService {
    @Autowired
    private UserService userService;

    /**
     * #############
     * #   CLAIMS  #
     * #############
     * En los tokens JWT, los claims comúnmente incluyen información como:

     sub (Subject): Identificador del usuario.
     exp (Expiration Time): Tiempo de expiración del token.
     iat (Issued At): Momento en que se emitió el token.
     iss (Issuer): Quién emitió el token.
     aud (Audience): A quién está destinado el token.
     */
    // Llave para firmar el JWT, obtenida del archivo de propiedades de la aplicación.
    @Value("${jwt.secret}")
    private String jwtSigningKey;

    // Extrae el nombre de usuario (subject) del token JWT.
    // En un JWT, el 'subject' suele referirse al identificador del usuario.
    @Override
    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Genera un token JWT para un usuario con detalles específicos (UserDetails).
    @Override
    public String generateToken(UserDetails userDetails) {
        System.out.println(userDetails);
        User user = userService.getByUsername(userDetails.getUsername());
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUsername());
        claims.put("role", user.getRole().toString());
        claims.put("reliable", user.getReliable());
        claims.put("profilePic", user.getProfilePic());
        claims.put("id", user.getId());

        return generateToken(claims, user);
    }

    // Verifica si el token es válido comparando el nombre de usuario y comprobando si ha expirado.
    @Override
    public boolean isTokenValid(String token, UserDetails userDetails) {
        User user = userService.getByUsername(userDetails.getUsername());
        final String userName = extractUserName(token);
        return (userName.equals(user.getEmail())) && !isTokenExpired(token);
    }

    // Método genérico para extraer información del token JWT.
    // Los claims son declaraciones que contienen información sobre el usuario y metadatos adicionales.
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }

    // Genera el token JWT incluyendo los claims adicionales y los detalles del usuario.
    // Los claims adicionales pueden ser usados para almacenar información adicional sobre el usuario o el token.
    private String generateToken(Map<String, Object> extraClaims, User user) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // Token expira en 10 horas
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Verifica si el token ha expirado.
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extrae la fecha de expiración del token.
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Extrae todas las claims del token.
    // Aquí se extrae y se procesa el conjunto completo de claims del JWT.

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Obtiene la llave de firma a partir de la cadena codificada en base64.
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSigningKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }


}