package com.conryfinance.model.monthlybudget;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(of = "id", callSuper = false)
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
public class MonthlyBudget {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MONTHLYBUDGET_SEQ")
    @SequenceGenerator(name = "MONTHLYBUDGET_SEQ", sequenceName = "MONTHLYBUDGET_SEQ", allocationSize = 1)
    private Long id;
    private String description;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Card> cards = new ArrayList<>();
    private LocalDate period = LocalDate.now();
}
