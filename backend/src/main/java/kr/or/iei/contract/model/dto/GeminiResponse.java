package kr.or.iei.contract.model.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GeminiResponse {
	private List<Candidate> candidates;
	
	@Data
	public static class Candidate {
		private Content content;
	}

}
