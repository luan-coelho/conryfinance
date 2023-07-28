package com.conryfinance.model.monthlybudget;

import com.conryfinance.model.enums.CardType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(of = "id")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CARD_SEQ")
    @SequenceGenerator(name = "CARD_SEQ", sequenceName = "CARD_SEQ", allocationSize = 1)
    private Long id;
    private String description;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "card", fetch = FetchType.LAZY)
    private List<CardItem> cardItems = new ArrayList<>();
    private BigDecimal amount = new BigDecimal(0);
    private CardType cardType = CardType.DEFAULT;
    @ManyToOne
    private MonthlyBudget monthlyBudget;
}
