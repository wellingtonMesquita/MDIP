package com.example.mapeamento.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;

@Entity
public class ProcessosModel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nomeProcesso;

    private Date dataCriacao;

    private String situacao;

    private byte[] imagem;


   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn()
    private InstituicaoModel instituicaoModel;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getNomeProcesso() {
        return nomeProcesso;
    }

    public void setNomeProcesso(String nomeProcesso) {
        this.nomeProcesso = nomeProcesso;
    }

    public Date getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(Date dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public String getSituacao() {
        return situacao;
    }

    public void setSituacao(String situacao) {
        this.situacao = situacao;
    }

    public InstituicaoModel getInstituicaoModel() {
        return instituicaoModel;
    }

    public void setInstituicaoModel(InstituicaoModel instituicaoModel) {
        this.instituicaoModel = instituicaoModel;
    }

    public byte[] getImagem() {
        return imagem;
    }

    public void setImagem(byte[] imagem) {
        this.imagem = imagem;
    }
}
