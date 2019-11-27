package com.example.mapeamento.repository;

import com.example.mapeamento.model.TextoModel;
import org.springframework.data.repository.PagingAndSortingRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface ConectorRepository extends PagingAndSortingRepository<TextoModel, Long> {
    @Transactional
    List<TextoModel> removeByProcessosModelId(Long id);

}
