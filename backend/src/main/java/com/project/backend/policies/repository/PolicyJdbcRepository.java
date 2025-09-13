package com.project.backend.policies.repository;

import com.project.backend.policies.domain.Policy;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class PolicyJdbcRepository {

    private final JdbcTemplate jdbcTemplate;

    public void bulkInsert(List<Policy> policies) {
        String sql = "INSERT INTO policy " +
                "(seq, type_dv, title, contents, appl_st_dt, appl_ed_dt, edu_target," +
                "area1nm, area2nm, charge_agency, charge_dept, charge_tel, info_url, " +
                "tot_quantity, price) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        jdbcTemplate.batchUpdate(
                sql,
                policies,
                1000, // batch size
                (ps, policy) -> {
                    ps.setString(1, policy.getSeq());
                    ps.setString(2, policy.getTypeDv());
                    ps.setString(3, policy.getTitle());
                    ps.setString(4, policy.getContents());
                    ps.setString(5, policy.getApplStDt());
                    ps.setString(6, policy.getApplEdDt());
                    ps.setString(7, policy.getEduTarget());
                    ps.setString(8, policy.getArea1Nm());
                    ps.setString(9, policy.getArea2Nm());
                    ps.setString(10, policy.getChargeAgency());
                    ps.setString(11, policy.getChargeDept());
                    ps.setString(12, policy.getChargeTel());
                    ps.setString(13, policy.getInfoUrl());
                    ps.setString(14, policy.getTotQuantity());
                    ps.setString(15, policy.getPrice());
                }
        );
    }
}