package com.dolethanhtuan.entity.embeddedID;

import jakarta.persistence.Embeddable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.io.Serializable;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Embeddable
public class OrderDetailId implements Serializable {
    private Long orderId;
    private Long productId;

}
