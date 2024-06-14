package com.jgm.tracer.model;

import jakarta.persistence.*;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import jakarta.validation.constraints.NotBlank;
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
    @NotBlank
    private String username;

    @Column(nullable = false, name = "\"role\"")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(nullable = true)
    private String profilePic;

    @Column(nullable = false)
    @NotBlank
    private String password;

    @Column(nullable = false, length = 40)
    @NotBlank
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
            name = "UserBlockUser",
            joinColumns = @JoinColumn(name = "blockerId"),
            inverseJoinColumns = @JoinColumn(name = "blockedId")
    )
    private Set<User> blocked;

    @ManyToMany
    @JoinTable(
            name = "UserUser",
            joinColumns = @JoinColumn(name = "followerId"),
            inverseJoinColumns = @JoinColumn(name = "followedId")
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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Threadpost> threadposts;

    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL, orphanRemoval = true)
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
