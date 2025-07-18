package kr.or.iei.invoice.model.dao;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.invoice.model.dto.Invoice;

@Mapper
public interface InvoiceDao {

	int selectInvoiceCount(HashMap<String, Object> params);

	ArrayList<Invoice> selectInvoiceList(HashMap<String, Object> params);

}
