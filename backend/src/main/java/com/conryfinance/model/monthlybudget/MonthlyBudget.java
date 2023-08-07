package com.conryfinance.model.monthlybudget;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
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
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "monthlyBudget")
    private List<Card> cards = new ArrayList<>();
    private LocalDate period = LocalDate.now();
    private BigDecimal budget;
    @Transient
    private BigDecimal remainingTotalAmount;
    @Transient
    private BigDecimal totalAmountSpent;

    public BigDecimal calculateRemainingTotalAmount() {
        BigDecimal amount = new BigDecimal(budget.toString());

        if(budget == null){
            return amount;
        }

        for (Card card : this.cards) {
            for (CardItem cardItem : card.getCardItems()) {
                amount = amount.subtract(cardItem.getAmount());
            }
        }
        return amount;
    }

    public BigDecimal calculateTotalAmountSpent() {
        BigDecimal amount = new BigDecimal("0.00");

        if(budget == null){
            return amount;
        }

        for (Card card : this.cards) {
            for (CardItem cardItem : card.getCardItems()) {
                amount = amount.add(cardItem.getAmount());
            }
        }
        return amount;
    }
}
