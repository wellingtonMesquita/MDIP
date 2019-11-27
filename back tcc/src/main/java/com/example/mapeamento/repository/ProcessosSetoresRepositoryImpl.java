package com.example.mapeamento.repository;


import com.example.mapeamento.model.PagePersonalizado;

import com.example.mapeamento.model.SetoresProcessosModel;
import com.example.mapeamento.vo.ProcessosVO;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Repository
public class ProcessosSetoresRepositoryImpl implements ProcessosSetoresRepositoryCustom {
    @PersistenceContext
    EntityManager entityManager;
    @Override
    public PagePersonalizado getfiltro(ProcessosVO processosVO) {
        Query query = entityManager.createNativeQuery( montarquery(processosVO), SetoresProcessosModel.class);
        definirParametros(query,processosVO);
        Integer page = processosVO.getPage();
        PagePersonalizado pagina = new PagePersonalizado();
        int primeiroresultado = page;
        int total = query.getResultList().size();
        int resto = total % processosVO.getSize();
        int totaldepaginas = total / processosVO.getSize();
        if(resto!=0){ totaldepaginas += 1;};
        pagina.setTotalPages(totaldepaginas);
        query.setMaxResults(processosVO.getSize());
        if(primeiroresultado>0){primeiroresultado*=(processosVO.getSize());}
        query.setFirstResult(primeiroresultado);
        pagina.setContent(query.getResultList());
        pagina.setNumber(page);
        return pagina;
    }

    public String montarquery(ProcessosVO processosVO){

        StringBuilder stringBuilder = new StringBuilder();

        stringBuilder.append(" SELECT * FROM processos_model pro inner join setores_processos_model em on em.processos_model_id = pro.id inner join setor_model setor on em.setor_model_id = setor.id  where 1=1 ");

        if(processosVO.getSituacao()!=null){
            stringBuilder.append(" and pro.situacao = :situacao ");
        }
        if(processosVO.getOrdem()!=(null)){
            stringBuilder.append(" and pro.ordem = :ordem ");
        }
        if(processosVO.getDataCriacao()!=(null)){
            stringBuilder.append(" and pro.data_criacao = :data_criacao ");
        }
        if(processosVO.getNomeProcesso()!=(null) && processosVO.getNomeProcesso()!= ""){
            stringBuilder.append(" and  pro.nome_processo like :nomeProcesso");
        }
        if(processosVO.getSetor()!=(null)){
            stringBuilder.append(" and setor.nome_setor like :nomeSetor");
        }


        return stringBuilder.toString();
    }

    public void definirParametros(Query query,ProcessosVO processosVO){

        if(processosVO.getSituacao()!=(null) ){
            query.setParameter("situacao",processosVO.getSituacao());
        }
        if(processosVO.getOrdem()!=(null)){
            query.setParameter("ordem",processosVO.getOrdem());
        }
        if(processosVO.getDataCriacao()!=(null) ){
            query.setParameter("data_criacao",processosVO.getDataCriacao());
        }
        if(processosVO.getNomeProcesso()!=(null) && processosVO.getNomeProcesso()!= ""){
            query.setParameter("nomeProcesso","%"+processosVO.getNomeProcesso()+"%");
        }
        if(processosVO.getSetor()!=(null)){
            query.setParameter("nomeSetor","%"+processosVO.getSetor()+"%");
        }

    }
}
