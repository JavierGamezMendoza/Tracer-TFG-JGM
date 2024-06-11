package com.jgm.tracer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


@Entity
@Getter
@Setter
public class User implements UserDetails {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 40)
    private String username;

    @Column(nullable = false, name = "\"role\"")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(nullable = true)
    private String profilePic;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 40)
    private String email;

    @Column
    private String bio;

    @Column(nullable = false)
    private Boolean reliable;

    @ManyToMany
    @JoinTable(
            name = "UserThread",
            joinColumns = @JoinColumn(name = "userId"),
            inverseJoinColumns = @JoinColumn(name = "threadId")
    )
    private Set<Thread> threads;

    @ManyToMany
    @JoinTable(
            name = "UserUser",
            joinColumns = @JoinColumn(name = "followersId"),
            inverseJoinColumns = @JoinColumn(name = "followsId")
    )
    private Set<User> follows;

    @ManyToMany(mappedBy = "follows")
    private Set<User> followers;

    @ManyToMany
    @JoinTable(
            name = "UserVehile",
            joinColumns = @JoinColumn(name = "userId"),
            inverseJoinColumns = @JoinColumn(name = "vehicleId")
    )
    private Set<Vehicle> vehicles;

    @OneToMany(mappedBy = "user")
    private Set<Threadpost> threadposts;

    @OneToMany(mappedBy = "creator")
    private Set<Thread> createdThreads;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(role.toString()));
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
