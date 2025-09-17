package com.project.backend.farm.domain;

public enum FarmType {
    RICE_PADDY("논(벼 재배)"),
    FIELD("밭(채소/잡곡)"),
    ORCHARD("과수원"),
    LIVESTOCK("축사"),
    FACILITY_CULTIVATION("시설재배지(비닐하우스/온실)"),
    FOREST_SPECIAL("임야/특용작물"),
    OTHER("기타");

    private final String description;

    FarmType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
