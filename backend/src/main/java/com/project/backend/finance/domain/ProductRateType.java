package com.project.backend.finance.domain;

public enum ProductRateType {
    FIXED("고정"),
    VARIABLE("변동"),
    FIXED_AND_VARIABLE("고정+변동");

    private final String description;

    ProductRateType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public static ProductRateType fromLabel(String label) {
        for (ProductRateType type : values()) {
            if (type.description.equals(label)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown label: " + label);
    }
}
