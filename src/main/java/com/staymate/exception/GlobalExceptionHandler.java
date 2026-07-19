// package com.staymate.exception;

// import java.time.LocalDateTime;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.MethodArgumentNotValidException;
// import org.springframework.web.bind.annotation.ExceptionHandler;
// import org.springframework.web.bind.annotation.RestControllerAdvice;

// import com.staymate.dto.ErrorResponse;

// @RestControllerAdvice
// public class GlobalExceptionHandler {

//     @ExceptionHandler(ResourceNotFoundException.class)
//     public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex) {

//         ErrorResponse error = new ErrorResponse(
//                 LocalDateTime.now(),
//                 ex.getMessage());

//         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
//     }

//     @ExceptionHandler(CustomException.class)
//     public ResponseEntity<ErrorResponse> handleCustomException(CustomException ex) {

//         ErrorResponse error = new ErrorResponse(
//                 LocalDateTime.now(),
//                 ex.getMessage());

//         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
//     }

//     @ExceptionHandler(MethodArgumentNotValidException.class)
//     public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {

//         String message = ex.getBindingResult()
//                            .getFieldError()
//                            .getDefaultMessage();

//         ErrorResponse error = new ErrorResponse(
//                 LocalDateTime.now(),
//                 message);

//         return ResponseEntity.badRequest().body(error);
//     }

//     @ExceptionHandler(Exception.class)
//     public ResponseEntity<ErrorResponse> handleException(Exception ex) {

//         ErrorResponse error = new ErrorResponse(
//                 LocalDateTime.now(),
//                 "Something went wrong.");

//         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
//     }
// }