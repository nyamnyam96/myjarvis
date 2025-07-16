// src/component/contract/detail/ContractFiles.jsx
export default function ContractFiles({ files }) {
    return (
        <div>
            <ul>
                {files.map(file => (
                    <li key={file.fileNo}>{file.fileName}</li>
                ))}
            </ul>
        </div>
    );
}