package com.example.mapeamento.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class UsuarioModel implements Serializable {


    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nomeUsuario;

    private String email;

    private String nome;

    private String cargo;

    private InstituicaoModel instituicaoModel;

    private SetorModel setorModel;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public InstituicaoModel getInstituicaoModel() {
        return instituicaoModel;
    }

    public void setInstituicaoModel(InstituicaoModel instituicaoModel) {
        this.instituicaoModel = instituicaoModel;
    }

    public SetorModel getSetorModel() {
        return setorModel;
    }

    public void setSetorModel(SetorModel setorModel) {
        this.setorModel = setorModel;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsuarioModel usuarioModel = (UsuarioModel) o;
        return Objects.equals(id, usuarioModel.id) &&
                Objects.equals(nomeUsuario, usuarioModel.nomeUsuario) &&
                Objects.equals(email, usuarioModel.email) &&
                Objects.equals(nome, usuarioModel.nome) &&
                Objects.equals(cargo, usuarioModel.cargo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nomeUsuario, email, nome, cargo);
    }
}
