package com.example.mapeamento.repository;

import com.example.mapeamento.model.SetoresProcessosModel;
import org.springframework.data.repository.PagingAndSortingRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface ProcessosSetoresRepository extends PagingAndSortingRepository<SetoresProcessosModel, Long>, ProcessosSetoresRepositoryCustom {

    List<SetoresProcessosModel> findByProcessosModelId(Long id);
    @Transactional
    List<SetoresProcessosModel> deleteByProcessosModelId(Long id);



}
