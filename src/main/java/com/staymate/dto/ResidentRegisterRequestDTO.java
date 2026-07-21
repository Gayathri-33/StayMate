package com.staymate.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResidentRegisterRequestDTO {
	  private String fullName;
	    private String email;
	    private String phone;
	    private String password;
	    private String hostelCode;
}
