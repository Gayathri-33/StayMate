package com.staymate.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.staymate.dto.UserDTO;
import com.staymate.entity.Hostel;
import com.staymate.entity.User;
import com.staymate.enums.Status;
import com.staymate.exception.ResourceNotFoundException;
import com.staymate.repository.HostelRepository;
import com.staymate.repository.UserRepository;
import com.staymate.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final HostelRepository hostelRepository;
    
    @Override
    public User addUser(UserDTO userDTO) {

    		Hostel hostel = null;

    		if (userDTO.getHostelId() != null) {
    			hostel = hostelRepository.findById(userDTO.getHostelId())
    	            .orElseThrow(() ->
    	                    new ResourceNotFoundException("Hostel not found with ID: " + userDTO.getHostelId()));
    		}
    		
    		// TODO: Replace with generated password + BCrypt encryption
        String temporaryPassword = "Temp@123";

        User user = User.builder()
                .hostel(hostel)
                .fullName(userDTO.getFullName())
                .email(userDTO.getEmail())
                .phone(userDTO.getPhone())
                .password(temporaryPassword)
                .role(userDTO.getRole())
                .build();

        return userRepository.save(user);
    }
    
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    @Override
    public User getUserById(Integer userId) {

        return userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with ID: " + userId));
    }
    
    @Override
    public User updateUser(Integer userId, UserDTO userDTO) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with ID: " + userId));

        user.setPhone(userDTO.getPhone());

        return userRepository.save(user);
    }
    
    @Override
    public void deleteUser(Integer userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with ID: " + userId));

        user.setStatus(Status.INACTIVE);

        userRepository.save(user);
    }

}