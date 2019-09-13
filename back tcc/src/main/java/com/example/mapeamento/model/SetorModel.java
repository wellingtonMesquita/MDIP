package com.example.mapeamento.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class SetorModel implements Serializable {


    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nomeSetor;

    private String responsavelSertor;

    private InstituicaoModel instituicaoModel;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeSetor() {
        return nomeSetor;
    }

    public void setNomeSetor(String nomeSetor) {
        this.nomeSetor = nomeSetor;
    }

    public String getResponsavelSertor() {
        return responsavelSertor;
    }

    public void setResponsavelSertor(String responsavelSertor) {
        this.responsavelSertor = responsavelSertor;
    }

    public InstituicaoModel getInstituicaoModel() {
        return instituicaoModel;
    }

    public void setInstituicaoModel(InstituicaoModel instituicaoModel) {
        this.instituicaoModel = instituicaoModel;
    }
}
