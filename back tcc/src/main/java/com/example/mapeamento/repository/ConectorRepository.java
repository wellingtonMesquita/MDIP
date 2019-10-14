package com.example.mapeamento.repository;

import com.example.mapeamento.model.ConectorModel;
import com.example.mapeamento.model.LinhaModel;
import org.springframework.data.repository.PagingAndSortingRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface ConectorRepository extends PagingAndSortingRepository<ConectorModel, Long> {
    @Transactional
    List<ConectorModel> removeByProcessosModelId(Long id);

}
