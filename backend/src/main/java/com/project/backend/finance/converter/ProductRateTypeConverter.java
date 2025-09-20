package com.project.backend.finance.converter;

import com.project.backend.finance.domain.ProductRateType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class ProductRateTypeConverter implements AttributeConverter<ProductRateType, String> {

    @Override
    public String convertToDatabaseColumn(ProductRateType attribute) {
        return attribute != null ? attribute.getDescription() : null;
    }

    @Override
    public ProductRateType convertToEntityAttribute(String dbData) {
        return dbData != null ? ProductRateType.fromLabel(dbData) : null;
    }
}
