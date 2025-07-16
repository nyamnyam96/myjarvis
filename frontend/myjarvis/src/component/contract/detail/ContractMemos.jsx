// src/component/contract/detail/ContractMemos.jsx
export default function ContractMemos({ memos }) {
    return (
        <div>
            {memos.map(memo => (
                <div key={memo.memoNo}>
                    <p>{memo.content}</p>
                    <span>작성자: {memo.writer}</span>
                    <span>작성일: {memo.writeDate}</span>
                </div>
            ))}
        </div>
    );
}