package rw.landManagementSystem.LandSystem.dto;

import rw.landManagementSystem.LandSystem.model.User;

public class AuthResponse {
    private String token;
    private User user;
    private boolean twoFactorRequired;
    private String message;

    // Constructors
    public AuthResponse() {}

    public AuthResponse(String token, User user, boolean twoFactorRequired, String message) {
        this.token = token;
        this.user = user;
        this.twoFactorRequired = twoFactorRequired;
        this.message = message;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isTwoFactorRequired() {
        return twoFactorRequired;
    }

    public void setTwoFactorRequired(boolean twoFactorRequired) {
        this.twoFactorRequired = twoFactorRequired;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
