package com.example.demo.service;

import com.example.demo.dto.UsuarioDTO;
import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<UsuarioDTO> obtenerTodos() {
        return usuarioRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public UsuarioDTO crear(UsuarioDTO usuarioDTO) {
        Usuario usuario = convertirAEntidad(usuarioDTO);
        Usuario guardado = usuarioRepository.save(usuario);
        return convertirADTO(guardado);
    }

    public Optional<UsuarioDTO> obtenerPorId(Long id) {
        return usuarioRepository.findById(id).map(this::convertirADTO);
    }

    public Optional<UsuarioDTO> actualizar(Long id, UsuarioDTO usuarioDetalles) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNombre(usuarioDetalles.getNombre());
            usuario.setEmail(usuarioDetalles.getEmail());
            usuario.setEdad(usuarioDetalles.getEdad());
            Usuario actualizado = usuarioRepository.save(usuario);
            return convertirADTO(actualizado);
        });
    }

    public boolean eliminar(Long id) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuarioRepository.deleteById(id);
            return true;
        }).orElse(false);
    }

    // Métodos de conversión
    private UsuarioDTO convertirADTO(Usuario usuario) {
        return new UsuarioDTO(usuario.getId(), usuario.getNombre(), usuario.getEmail(), usuario.getEdad());
    }

    private Usuario convertirAEntidad(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setId(dto.getId());
        usuario.setNombre(dto.getNombre());
        usuario.setEmail(dto.getEmail());
        usuario.setEdad(dto.getEdad());
        return usuario;
    }
}
