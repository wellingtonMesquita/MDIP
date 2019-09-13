package com.example.mapeamento.repository;


import com.example.mapeamento.model.*;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository
public class FluxogramaRepositoryImpl implements FluxogramaRepository{
    @PersistenceContext
    EntityManager entityManager;


    @Override
    public List<Object> getFluxograma(Long id) {
        List<Object> fluxograma = new ArrayList<>();

        Query conector = entityManager.createNativeQuery("SELECT * FROM conector_model fl inner join processos_model pro on fl.processos_model_id = pro.id  where pro.id = :id ", ConectorModel.class);
        conector.setParameter("id",id);
        List<ConectorModel> conectorModels = conector.getResultList();
        for(ConectorModel conectorModel: conectorModels){
            fluxograma.add(conectorModel);
        }
        Query figura = entityManager.createNativeQuery("SELECT * FROM figura_model fl inner join processos_model pro on fl.processos_model_id = pro.id  where pro.id = :id ", FiguraModel.class);
        figura.setParameter("id",id);
        List<FiguraModel> figuraModels = figura.getResultList();
        for(FiguraModel figuraModel: figuraModels){
            fluxograma.add(figuraModel);
        }

        Query linha = entityManager.createNativeQuery("SELECT * FROM linha_model fl inner join processos_model pro on fl.processos_model_id = pro.id  where pro.id = :id ", LinhaModel.class);
        linha.setParameter("id",id);
        List<LinhaModel> linhaModels = linha.getResultList();
        for(LinhaModel linhaModel: linhaModels){
            fluxograma.add(linhaModel);
        }

        return fluxograma;
    }
}
