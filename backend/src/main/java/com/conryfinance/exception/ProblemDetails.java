package com.conryfinance.exception;

import lombok.*;

import java.net.URI;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
/*
Problem Details
 */
public class ProblemDetails {

    private URI type;
    private String title;
    private int status;
    private String detail;
    private URI instance;
}