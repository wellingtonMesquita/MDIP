package com.example.mapeamento.endpoint;

import java.time.Year;
import java.util.Objects;
import java.util.Optional;

import com.example.mapeamento.config.JwtTokenUtil;
import com.example.mapeamento.model.JwtRequest;
import com.example.mapeamento.model.JwtResponse;
import com.example.mapeamento.model.ProcessosModel;
import com.example.mapeamento.model.UsuarioModel;
import com.example.mapeamento.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserDetailsService jwtInMemoryUserDetailsService;

	@Autowired
	private UsuarioRepository usuarioRepository;

	private String token;


	@CrossOrigin
	@GetMapping(path = "/token")
	public ResponseEntity<?> tokenInform() {
		System.out.println(this.token);
		return ResponseEntity.ok(new JwtResponse(this.token));
	}


	@CrossOrigin
	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest)
			throws Exception {

		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

		final UserDetails userDetails = jwtInMemoryUserDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());

		final String token = jwtTokenUtil.generateToken(userDetails);
		this.token = new JwtResponse(token).getToken();

		return ResponseEntity.ok(new JwtResponse(token));
	}

	private void authenticate(String username, String password) throws Exception {
		Objects.requireNonNull(username);
		Objects.requireNonNull(password);

		try {
			UsuarioModel usuarioModel = new UsuarioModel();
		usuarioModel = usuarioRepository.findByNomeUsuarioAndPassword(username,password);
		System.out.println(usuarioModel);


		if(usuarioModel == null){
			throw new BadCredentialsException("");
		}

		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}
