package kr.or.iei.contract.model.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiReviewResponse {
	private String summary;       // 핵심 요약
    private List<String> pros;    // 유리한 조항
    private List<String> cons;    // 불리한/독소 조항

}
