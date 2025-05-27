package rw.landManagementSystem.LandSystem.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class TwoFactorRequest {
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    @NotBlank(message = "2FA code is required")
    @Size(min = 6, max = 6, message = "2FA code must be 6 digits")
    private String code;

    // Constructors
    public TwoFactorRequest() {}

    public TwoFactorRequest(String email, String code) {
        this.email = email;
        this.code = code;
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
