# 금융 상품 데이터 INSERT SQL
INSERT_QUERY_FINANCE_TABLE = """
INSERT INTO finance (
    product_id, product_name, product_feature, loan_target, loan_period,
    loan_limit, repayment_method, principal_repayment_guide, overdue_guide,
    collateral_guarantee, required_documents, customer_burden_costs,
    payment, precautions, others, compliance_supervisor,
    loan_interest_rate, rate_type
) VALUES (
    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
) ON DUPLICATE KEY UPDATE  -- 중복된 기본키가 있을 경우 기존 데이터를 아래 컬럼 기준으로 업데이트
    product_name = VALUES(product_name),
    product_feature = VALUES(product_feature),
    loan_target = VALUES(loan_target),
    loan_period = VALUES(loan_period),
    loan_limit = VALUES(loan_limit),
    repayment_method = VALUES(repayment_method),
    principal_repayment_guide = VALUES(principal_repayment_guide),
    overdue_guide = VALUES(overdue_guide),
    collateral_guarantee = VALUES(collateral_guarantee),
    required_documents = VALUES(required_documents),
    customer_burden_costs = VALUES(customer_burden_costs),
    payment = VALUES(payment),
    precautions = VALUES(precautions),
    others = VALUES(others),
    compliance_supervisor = VALUES(compliance_supervisor),
    loan_interest_rate = VALUES(loan_interest_rate),
    rate_type = VALUES(rate_type)
"""

# 데이터 SELECT
SELECT_QUERY = """
SELECT * FROM {table_name}
"""
