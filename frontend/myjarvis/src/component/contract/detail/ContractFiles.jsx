// src/component/contract/detail/ContractFiles.jsx

export default function ContractFiles({ files }) {
    const serverUrl = import.meta.env.VITE_BACK_SERVER;

    const getFilenameFromPath = (path) => {
        const lastSlashIndex = Math.max(path.lastIndexOf('\\'), path.lastIndexOf('/'));
        return path.substring(lastSlashIndex + 1);
    };

    return (
        <div className="contract-files-container">
            {!files || files.length === 0 ? (
                <p className="no-files-message">첨부된 파일이 없습니다.</p>
            ) : (
                <ul className="file-list">
                    {files.map(file => (
                        <li key={file.fileNo} className="file-item">
                            <span className="material-symbols-outlined file-icon">description</span>
                            <a 
                                href={`${serverUrl}/uploads/${getFilenameFromPath(file.filePath)}`} 
                                target="_blank"
                                rel="noopener noreferrer"
                                download={file.fileOrigin}
                            >
                                {/* fileNo 대신, 실제 파일 이름인 file.fileOrigin을 보여줍니다. */}
                                {file.fileOrigin}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}