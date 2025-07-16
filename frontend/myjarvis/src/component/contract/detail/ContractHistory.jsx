// src/component/contract/detail/ContractHistory.jsx
export default function ContractHistory({ history }) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>변경일</th>
                        <th>변경자</th>
                        <th>변경 항목</th>
                        <th>변경 전</th>
                        <th>변경 후</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map(item => (
                        <tr key={item.historyNo}>
                            <td>{item.changeDate}</td>
                            <td>{item.changer}</td>
                            <td>{item.changedItem}</td>
                            <td>{item.before}</td>
                            <td>{item.after}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}