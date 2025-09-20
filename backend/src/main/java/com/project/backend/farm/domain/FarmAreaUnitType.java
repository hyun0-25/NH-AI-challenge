package com.project.backend.farm.domain;

public enum FarmAreaUnitType {
    M2("㎡"),
    PYEONG("평"),
    HECTARE("ha");

    private final String description;

    FarmAreaUnitType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
