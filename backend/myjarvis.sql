-- ȸ�� ���̺�
CREATE TABLE TBL_MEMBER (
    MEMBER_NO VARCHAR2(20) NOT NULL,                             -- ȸ��������ȣ
    MEMBER_ID VARCHAR2(30) NOT NULL,                             -- ���̵�(Unique)
    MEMBER_PW VARCHAR2(100) NOT NULL,                            -- ��й�ȣ
    MEMBER_NAME VARCHAR2(50) NOT NULL,                           -- �̸�
    MEMBER_STATUS CHAR(1)  DEFAULT 'Y' NOT NULL,                  -- ���� 'Y(�⺻��) �Ϲ�ȸ�� / N Ż��ȸ�� / A ������'
    MEMBER_EMAIL VARCHAR2(100) NOT NULL,                         -- �̸���
    MEMBER_PHONE VARCHAR2(20) NOT NULL,                          -- ��ȭ��ȣ
    JOIN_DATE DATE DEFAULT SYSDATE NOT NULL ,                     -- ȸ��������
    MEMBER_COMP_NAME VARCHAR2(100),			-- ȸ�� ��ȣ��
    MEMBER_COMP_NO VARCHAR2(100),			-- ȸ������ڹ�ȣ

    CONSTRAINT PK_TBL_MEMBER PRIMARY KEY (MEMBER_NO),            -- �⺻Ű ��������
    CONSTRAINT UQ_TBL_MEMBER_ID UNIQUE (MEMBER_ID)               -- ���̵�� ����ũ
);

-- ȸ�� ������ �����ϴ� �ٽ� ���̺��, ��κ��� ���(���, ��, ���� ��)�� ������ �Ǵ� �߽� ���̺��Դϴ�.
-- �� �÷��� ȸ�� �ĺ�, ����, ����, ���� ������ �ʿ��� ������ �����մϴ�.
-- MEMBER_NO: ȸ�� ���� �ĺ� ��ȣ. �� �ý��ۿ��� �������� �����Ǵ� PK�Դϴ�.
-- MEMBER_ID: �α��ο� ���̵�. �ߺ��� ���� ���� UNIQUE ������ �����߽��ϴ�.
-- MEMBER_STATUS: ȸ�� ���� �ڵ�. 'Y': �Ϲ�ȸ��(�⺻��), 'N': Ż��ȸ��, 'A': ������ ���п��Դϴ�.
-- JOIN_DATE: ȸ�� ���� ����. �⺻���� �ý��� �ð�(SYSDATE)���� �ڵ� ��ϵǵ��� �����߽��ϴ�.
-- PK�� MEMBER_NO ���� �÷��̸�, ���̵� �ߺ��� ���� ���� UQ ���൵ �Բ� �����Ǿ� �ֽ��ϴ�.


-- ��� ���� ���̺�
CREATE TABLE TBL_CONTRACT_STATUS (
    STATUS_CODE VARCHAR2(20) NOT NULL,                       -- ��� ���� �ڵ� (��: 'W', 'C', 'X', 'T')
    STATUS_NAME VARCHAR2(50) NOT NULL,                       -- ���� ���� (��: ���, Ȯ��, ��� ��)

    CONSTRAINT PK_TBL_CONTRACT_STATUS PRIMARY KEY (STATUS_CODE) -- �����ڵ� ���� �⺻Ű
);

-- ��� ����(W:���, C:Ȯ��, X:��� ��)�� �ڵ�ȭ�� �����ϴ� ���� �ڵ� ���̺��Դϴ�.
-- �����ڵ�� �ٸ� ���̺�(TBL_CONTRACT, TBL_SCHEDULE ��)���� �����ǹǷ� ���� PK�� �����մϴ�.


-- ���� ���̺�
CREATE TABLE TBL_CLIENT (
    CLIENT_NO VARCHAR2(20) NOT NULL,                             -- �� ������ȣ
    MEMBER_NO VARCHAR2(20) NOT NULL,                             -- ȸ�� ������ȣ (�����)
    CLIENT_NAME VARCHAR2(50) NOT NULL,                           -- �� �̸�
    CLIENT_PHONE VARCHAR2(20) NOT NULL,                          -- �� ��ȭ��ȣ
    CLIENT_EMAIL VARCHAR2(100) NOT NULL,                         -- �� �̸���
    REG_DATE DATE DEFAULT SYSDATE NOT NULL ,                      -- �� �������

    CONSTRAINT PK_TBL_CLIENT PRIMARY KEY (CLIENT_NO, MEMBER_NO), -- ���� �⺻Ű: ���� ȸ���� ������ �� ���п�
    CONSTRAINT FK_CLIENT_MEMBER FOREIGN KEY (MEMBER_NO) REFERENCES TBL_MEMBER(MEMBER_NO) -- ��� ȸ�� �ܷ�Ű
);

-- ���� �� ������ �����ϴ� ���̺��Դϴ�.
-- CLIENT_NO�� ���� �⺻Ű�̸�, �� ȸ��(MEMBER_NO)���� ���е˴ϴ�.
-- CLIENT_NO�� MEMBER_NO�� ���� ����ũ ����� �����Ǿ� ������, ���(CONTRACT), ȸ��(MEETING) ��� MEMBER_NO�� �Բ� �ܷ�Ű�� �����˴ϴ�.
-- ���� ���� �̸�, ����ó, �̸��� ���� �⺻ ������ ���� ������, �ŷ�ó ���̺���� ������ �����˴ϴ�.


-- �ŷ�ó ���̺�
CREATE TABLE TBL_COMPANY (
    COMP_CD VARCHAR2(20) NOT NULL,                              -- �ŷ�ó ������ȣ
    MEMBER_NO VARCHAR2(20) NOT NULL,                            -- ȸ�� ������ȣ (�����)
    COMP_NAME VARCHAR2(100) NOT NULL,                           -- �ŷ�ó��
    COMP_TEL VARCHAR2(100),                                     -- �ŷ�ó ��ȭ��ȣ
    COMP_ADDR VARCHAR2(100),                                    -- �ŷ�ó �ּ�
    OWNER_NAME VARCHAR2(30),				-- ��ǥ�� �̸�
    TRADE_STATUS CHAR(1)  DEFAULT '1' NOT NULL,                  -- �ŷ� ���� ('1': �ŷ�, '2': �ŷ�����)
   COMP_TYPE CHAR(1) NOT NULL,				-- ����� ���� ( C:���� , P:���� )    
   COMP_NO VARCHAR2(100) NULL,				-- ����� ��ȣ
   REG_DATE DATE DEFAULT SYSDATE NOT NULL ,                         -- �ŷ�ó �������

    CONSTRAINT PK_TBL_COMPANY PRIMARY KEY (COMP_CD, MEMBER_NO), -- ���� �⺻Ű: ���� ȸ���� ���� �ŷ�ó ����
    CONSTRAINT FK_COMPANY_MEMBER FOREIGN KEY (MEMBER_NO) REFERENCES TBL_MEMBER(MEMBER_NO) -- ȸ�� �ܷ�Ű
);

-- �ŷ�ó(���� ��) ������ �����ϴ� ���̺��Դϴ�.
-- �ŷ�ó�� ȸ�� ������ ��ϵǸ�, ������ �ŷ�ó �ڵ�(COMP_CD)�� ȸ��(MEMBER_NO)�� ���� ������ ������ �� �ֽ��ϴ�.
-- ���� COMP_CD�� MEMBER_NO�� ���� �⺻Ű�� �����Ǿ� �ְ�, ��� �� ���� ���̺����� �� �� ���� �Բ� �ܷ�Ű�� �����մϴ�.


-- �±� ���̺�
CREATE TABLE TBL_TAG (
    TAG_NO VARCHAR2(20) NOT NULL,                              -- �±� ������ȣ
    MEMBER_NO VARCHAR2(20) NOT NULL,                           -- ȸ�� ������ȣ (�±� ������)
    TAG_NAME VARCHAR2(50) NOT NULL,                            -- �±� �̸�
    TAG_COLOR VARCHAR2(20),                                    -- �±� ���� (�ð� ���п�)
    REG_DATE DATE DEFAULT SYSDATE NOT NULL ,                    -- �±� �������

    CONSTRAINT PK_TBL_TAG PRIMARY KEY (TAG_NO, MEMBER_NO),     -- ���� PK: �±׺� ������ ����
    CONSTRAINT FK_TAG_MEMBER FOREIGN KEY (MEMBER_NO) REFERENCES TBL_MEMBER(MEMBER_NO)
);

-- ȸ���� ������ �±� ������ �����ϴ� ���̺��Դϴ�.
-- ������ TAG_NO�� ���� ȸ������ ������ �� �����Ƿ�, TAG_NO�� MEMBER_NO�� ���� PK�� ����մϴ�.
-- �±� ������ �ð��� ���п��̸�, MEMBER_NO�� �����ڸ� ��Ÿ���� �ܷ�Ű�Դϴ�.


-- ����÷�� ���̺�
CREATE TABLE TBL_FILE (
    FILE_NO VARCHAR2(20) NOT NULL,                               -- ���� ������ȣ
    MEMBER_NO VARCHAR2(20) NOT NULL,                             -- ȸ�� ������ȣ (���δ�)
    FILE_ORIGIN VARCHAR2(255) NOT NULL,                          -- ���� ���ϸ� (����� ���ε� �̸�)
    FILE_NAME VARCHAR2(255) NOT NULL,                            -- ���� ���� ���ϸ�
    FILE_PATH VARCHAR2(500) NOT NULL,                            -- ���� ��� (���� ���� �Ǵ� URL)
    UPLOAD_DATE DATE DEFAULT SYSDATE NOT NULL ,                   -- ���� �����
    FILE_TABLE VARCHAR2(200) NOT NULL,                           -- ��� ���̺� �� ('contract', 'memo' ��)
    FILE_ID VARCHAR2(30) NOT NULL,                               -- ��� ���̺��� PK��
    FILE_SIZE NUMBER,                                            -- ���� ũ�� (byte)
    FILE_DELETED CHAR(1) DEFAULT 'N' NOT NULL ,                   -- ���� ���� ('Y' / 'N')

    CONSTRAINT PK_TBL_FILE PRIMARY KEY (FILE_NO, MEMBER_NO),
    CONSTRAINT FK_FILE_MEMBER FOREIGN KEY (MEMBER_NO) REFERENCES TBL_MEMBER(MEMBER_NO)
);

-- �پ��� ���̺�(���, �޸� ��)�� ÷�ε� ���� ������ �����ϴ� ���̺��Դϴ�.
-- FILE_TABLE�� ���� ��� ���̺����, FILE_ID�� �ش� ���̺��� PK���� �ǹ��մϴ�.
-- �̸� ���� �����ϰ� ���� ���̺�� ����ǵ��� �����Ͽ�����, FK ������ ���� �ʽ��ϴ�.
-- ���� ���δ��� �ĺ��ϱ� ���� MEMBER_NO�� �ܷ�Ű�� �����ϰ�, FILE_NO�� MEMBER_NO�� ���� PK�� ����Ͽ� ȸ���� ���� ������ �����մϴ�.


-- �޸� ���̺�
CREATE TABLE TBL_MEMO (
    MEMO_NO VARCHAR2(20) NOT NULL,                               -- �޸� ������ȣ
    MEMBER_NO VARCHAR2(20) NOT NULL,                             -- ȸ�� ������ȣ (�ۼ���)
    MEMO_TABLE VARCHAR2(30) NOT NULL,                            -- �޸� ��� ���̺� ���� ('contract', 'schedule' ��)
    MEMO_ID VARCHAR2(30) NOT NULL,                               -- �޸� ��� ���̺��� PK ��
    MEMO_CONTENT VARCHAR2(1000) NOT NULL,                        -- �޸� ����
    REG_DATE DATE DEFAULT SYSDATE NOT NULL,                      -- �޸� �������
    REVISE_DATE DATE,                                            -- ���� ���� (NULL ���)

    CONSTRAINT PK_TBL_MEMO PRIMARY KEY (MEMO_NO, MEMBER_NO),
    CONSTRAINT FK_MEMO_MEMBER FOREIGN KEY (MEMBER_NO) REFERENCES TBL_MEMBER(MEMBER_NO)
);

-- ERP �� �پ��� ���(���, ���� ��)�� �޸� ����� �ο��ϱ� ���� ���̺��Դϴ�.
-- MEMO_TABLE�� �޸� ������ ��� ���̺���� ��Ÿ����, MEMO_ID�� �ش� ���̺��� PK���� �����Ͽ� �����ϰ� �����մϴ�.
-- FK�� ���� �ʰ�, Java�ܿ��� ENUM/��� ������ Ÿ�� �ϰ����� �����մϴ�.
-- MEMBER_NO�� �ۼ��ڸ� �ĺ��ϱ� ���� �ܷ�Ű�Դϴ�.
-- MEMO_NO�� MEMBER_NO�� ���� �⺻Ű�� ����Ͽ� �ۼ��� ���� ���� �޸� ������ �����մϴ�.


-- �ŷ�ó ������ ���̺�
CREATE TABLE TBL_COMPANY_MEMBER (
    CONTACT_IDX VARCHAR2(20) NOT NULL,                             -- ������ ������ȣ
    COMP_CD VARCHAR2(20) NOT NULL,                                 -- �ŷ�ó ������ȣ
    MEMBER_NO VARCHAR2(20) NOT NULL,                               -- ȸ�� ������ȣ (�����)
    CONTACT_NAME VARCHAR2(30) NOT NULL,                            -- ����� �̸�
    CONTACT_EMAIL VARCHAR2(100),                                   -- ����� �̸���
    CONTACT_PHONE VARCHAR2(20),                                    -- ����� ��ȭ��ȣ
    IS_MAIN_CONTACT CHAR(3) DEFAULT 'N',                           -- ��ǥ ���� ('Y' / 'N')
    CONTACT_POSITION VARCHAR2(30),                                 -- ����� ��å
    CONTACT_DEPT VARCHAR2(30),                                     -- ����� �μ�
    REG_DATE DATE DEFAULT SYSDATE NOT NULL ,                            -- ������ �������

    CONSTRAINT PK_TBL_COMPANY_MEMBER PRIMARY KEY (CONTACT_IDX),    -- ������ ���� �⺻Ű
    CONSTRAINT FK_CM_COMP FOREIGN KEY (COMP_CD, MEMBER_NO) 
        REFERENCES TBL_COMPANY(COMP_CD, MEMBER_NO),                -- �ŷ�ó ���� �ܷ�Ű (COMP_CD + MEMBER_NO)
    CONSTRAINT FK_CM_MEMBER FOREIGN KEY (MEMBER_NO) 
        REFERENCES TBL_MEMBER(MEMBER_NO)                           -- ȸ�� �ܷ�Ű
);

-- �ŷ�ó(COMPANY)�� �Ҽӵ� ����� ������ �����ϴ� ���̺��Դϴ�.
-- CONTACT_IDX�� ������ ���� �ĺ����̸�, �⺻Ű�� ���˴ϴ�.
-- �ϳ��� �ŷ�ó(COMP_CD)�� ���� ����ڸ� ���� �� �����Ƿ�, COMP_CD + MEMBER_NO�� ���� �ܷ�Ű�� �����մϴ�.
-- IS_MAIN_CONTACT�� ��ǥ ����� ���θ� ǥ���ϸ�, ���� �������̳� �켱 �߼� ����� ���п� ���˴ϴ�.
-- �ŷ�ó�� ȸ�� �� ��� ���踦 ��Ȯ�� �ϱ� ���� MEMBER_NO�� ������ �ܷ�Ű�� ����Ǿ� �ֽ��ϴ�.


-- ������ ���̺�
CREATE TABLE TBL_CONTRACT (
    CONTRACT_NO         VARCHAR2(20) NOT NULL,                  -- ��� ������ȣ
    MEMBER_NO           VARCHAR2(20) NOT NULL,                  -- ��� ��� ȸ�� ��ȣ
    STATUS_CODE         VARCHAR2(20) NOT NULL,                  -- ��� ���� �ڵ� ('W', 'C', 'X', 'T')
    CONTRACT_TITLE      VARCHAR2(100) NOT NULL,                 -- ��� ����
    CONTRACT_CONTENT CLOB NOT NULL,			-- ��� ����
    REG_DATE            DATE DEFAULT SYSDATE NOT NULL,          -- ��� �������
    CONTRACT_START      DATE NOT NULL,                          -- ��� ������
    CONTRACT_END        DATE NOT NULL,                          -- ��� ������
    CONTRACT_DEPOSIT    NUMBER NOT NULL,                        -- ����
    CONTRACT_CONFIRM    DATE,                                   -- ��� Ȯ������

    CONSTRAINT PK_TBL_CONTRACT PRIMARY KEY (CONTRACT_NO),
    CONSTRAINT UQ_CONTRACT_STATUS UNIQUE (CONTRACT_NO, STATUS_CODE),
    CONSTRAINT FK_CONTRACT_MEMBER FOREIGN KEY (MEMBER_NO) REFERENCES TBL_MEMBER(MEMBER_NO),
    CONSTRAINT FK_CONTRACT_STATUS FOREIGN KEY (STATUS_CODE) REFERENCES TBL_CONTRACT_STATUS(STATUS_CODE)
);

-- ��� ������ �����ϴ� �ٽ� ���̺��Դϴ�.
-- CONTRACT_NO�� ���� �⺻Ű�� ���Ǹ�, �� ����� �����ϰ� �ĺ��մϴ�.
-- ����� �ݵ�� ȸ��(MEMBER_NO)�� ���� ��ϵǸ�, ��� ���� ��� ��� ���̺�� ����Ǿ� �ֽ��ϴ�.
-- ��� ���´� STATUS_CODE�� ǥ���Ǹ�, �����ڵ庰 ���� �� ������ ���� ���� UNIQUE ����(CONTRACT_NO + STATUS_CODE)�� �����Ǿ� �ֽ��ϴ�.
-- ����� �ֿ� �����δ� ��� ����, ����, ������, ������, Ȯ������ ���ԵǸ�, ������� �⺻������ SYSDATE�� �ڵ� �����˴ϴ�.


-- ����� ���̺�
CREATE TABLE TBL_CONTRACT_PARTY (
    ID             NUMBER PRIMARY KEY,                               -- ���� �ĺ��� (������ ��� ����)
    CONTRACT_NO    VARCHAR2(20) NOT NULL,                            -- ��� ��ȣ
    CLIENT_NO      VARCHAR2(20),                                     -- ���� �� ��ȣ (nullable)
    COMP_CD        VARCHAR2(20),                                     -- �ŷ�ó ���� ��ȣ (nullable)
    MEMBER_NO      VARCHAR2(20) NOT NULL,                            -- ��� ���� �Ҽ� ȸ��
    ROLE           VARCHAR2(50),                                     -- ��� �� ���� (��: �����, ������ ��)

    CONSTRAINT FK_PARTY_CONTRACT FOREIGN KEY (CONTRACT_NO)
        REFERENCES TBL_CONTRACT(CONTRACT_NO),

    CONSTRAINT FK_PARTY_CLIENT FOREIGN KEY (CLIENT_NO, MEMBER_NO)
        REFERENCES TBL_CLIENT(CLIENT_NO, MEMBER_NO),

    CONSTRAINT FK_PARTY_COMPANY FOREIGN KEY (COMP_CD, MEMBER_NO)
        REFERENCES TBL_COMPANY(COMP_CD, MEMBER_NO)
);

-- ����� �����(���� �� �Ǵ� ���� ����)�� �����ϴ� ���� ���̺��Դϴ�.
-- CONTRACT_NO�� �������� ��� ���� ���̺�(TBL_CONTRACT)�� ����Ǹ�, 1:N ������ �����˴ϴ�.
-- ����ڴ� ���� ��(CLIENT_NO) �Ǵ� ���� ����(COMP_CD) �� �ϳ��� ����Ǹ�, ������ �Ҽ� ȸ��(MEMBER_NO)�� �������� ���Ἲ�� Ȯ���մϴ�.
-- CLIENT_NO�� COMP_CD�� ���ÿ� ������ ������, ���ø����̼� �ܿ��� �� �ʸ� �Էµǵ��� �����ؾ� �մϴ�.


-- ȸ�� ���̺�
CREATE TABLE TBL_MEETING (
    MEETING_NO     VARCHAR2(20) NOT NULL,                          -- ȸ�� ������ȣ
    MEMBER_NO      VARCHAR2(20) NOT NULL,                          -- �ۼ��� ȸ����ȣ
    MEET_TITLE     VARCHAR2(100) NOT NULL,                         -- ȸ�� ����
    MEET_CONTENT   CLOB NOT NULL,                                  -- ȸ�� ����
    MEET_DATE      DATE DEFAULT SYSDATE NOT NULL,                  -- ȸ�� ����
    GPT_SUMMARY    VARCHAR2(1024),                                 -- AI ��� ����

    CONSTRAINT PK_TBL_MEETING PRIMARY KEY (MEETING_NO),
    CONSTRAINT FK_MEETING_MEMBER FOREIGN KEY (MEMBER_NO)
        REFERENCES TBL_MEMBER(MEMBER_NO)
);

-- ������ ���� Ŀ�´����̼�(ȸ��, ��� ��) ������ ����ϴ� ���̺��Դϴ�.
-- MEETING_NO�� ���� �⺻Ű�̸�, �� ȸ�Ǹ� �����ϰ� �ĺ��մϴ�.
-- ȸ�Ǵ� �ݵ�� ȸ��(MEMBER_NO)�� ���� ��ϵǸ�, ȸ���� ����ڴ� ������ ȸ�������� ���̺�(TBL_MEETING_PARTICIPANT)�� ����˴ϴ�.
-- ȸ���� �ֿ� �����δ� ȸ�� ����, ȸ�� ����, AI ��� ����� ������, ȸ�� ���ڴ� �⺻������ SYSDATE�� �ڵ� �����˴ϴ�.


-- ȸ�������� ���̺�
CREATE TABLE TBL_MEETING_PARTICIPANT (
    MEETING_PARTICIPANT_NO            NUMBER  PRIMARY KEY,                              -- ȸ�� ������ ������ȣ
    MEETING_NO    VARCHAR2(20) NOT NULL,                           -- ȸ�� ������ȣ
    CLIENT_NO     VARCHAR2(20),                                    -- ���� �� ��ȣ (nullable)
    COMP_CD       VARCHAR2(20),                                    -- �ŷ�ó ���� ��ȣ (nullable)
    MEMBER_NO     VARCHAR2(20) NOT NULL,                           -- �� �Ҽ� ȸ��

    CONSTRAINT FK_PARTICIPANT_MEETING FOREIGN KEY (MEETING_NO)
        REFERENCES TBL_MEETING(MEETING_NO),

    CONSTRAINT FK_PARTICIPANT_CLIENT FOREIGN KEY (CLIENT_NO, MEMBER_NO)
        REFERENCES TBL_CLIENT(CLIENT_NO, MEMBER_NO),

    CONSTRAINT FK_PARTICIPANT_COMPANY FOREIGN KEY (COMP_CD, MEMBER_NO)
        REFERENCES TBL_COMPANY(COMP_CD, MEMBER_NO)
);

-- ȸ�� �����(������)�� �����ϴ� ���̺��Դϴ�.
-- MEETING_NO�� �������� TBL_MEETING�� ����Ǹ�, 1:N ������ ȸ�� ����ڸ� �ټ� ������ �� �ֽ��ϴ�.
-- �����ڴ� ���� ��(CLIENT_NO) �Ǵ� �ŷ�ó ����(COMP_CD) �� �ϳ��� �����Ǹ�, ������ �Ҽ� ȸ��(MEMBER_NO)�� ���� ���Ἲ�� Ȯ���մϴ�.


-- �±׸� ���̺�
CREATE TABLE TBL_TAG_MAP (
    TAG_MAP_NO VARCHAR2(20) NOT NULL,                              -- �±� ���� ������ȣ
    TAG_NO VARCHAR2(20) NOT NULL,                                  -- �±� ������ȣ
    MEMBER_NO VARCHAR2(20) NOT NULL,                               -- �±� ���� ȸ�� ��ȣ
    TAG_TABLE VARCHAR2(255) NOT NULL,                              -- �±� ��� ���̺� �� (��: 'contract', 'schedule' ��)
    TAG_ID VARCHAR2(30) NOT NULL,                                  -- �±� ��� ���̺��� PK ��ȣ

    CONSTRAINT PK_TBL_TAG_MAP PRIMARY KEY (TAG_MAP_NO),           
    CONSTRAINT FK_TAGMAP_TAG FOREIGN KEY (TAG_NO, MEMBER_NO) REFERENCES TBL_TAG(TAG_NO, MEMBER_NO)
);

-- �پ��� ��� ���̺� �±׸� �����ϴ� ���� ���̺��Դϴ�.
-- TAG_MAP_NO�� �±� ������ ���� �ĺ����̸�, ���� PK�� �����˴ϴ�.
-- TAG_NO�� MEMBER_NO�� �Բ� ���� �ܷ�Ű�� ����Ǹ�, TBL_TAG�� ����Ű(TAG_NO, MEMBER_NO)�� ��Ȯ�� �����մϴ�.
-- �±� ��� ���̺��� TAG_TABLE�� TAG_ID�� ���� �ĺ��Ǹ�, ������ ���� ������ ����Ǿ� �������� �����մϴ�.


-- ����ǥ ���̺�
CREATE TABLE TBL_SCHEDULE (
    SCHEDULE_NO VARCHAR2(20) NOT NULL,                            -- ���� ������ȣ
    MEMBER_NO VARCHAR2(20) NOT NULL,                              -- ȸ�� ������ȣ (���� �����)
    CONTRACT_NO VARCHAR2(20) NOT NULL,                            -- ��� ������ȣ
    STATUS_CODE VARCHAR2(20) NOT NULL,                            -- ���� �����ڵ� ('W', 'C', 'X', 'T')
    SCHEDULE_TITLE VARCHAR2(20) NOT NULL,                         -- ���� ����
    SCHEDULE_START DATE NOT NULL,                                 -- ���� ������
    SCHEDULE_END DATE NOT NULL,                                   -- ���� ������
    REG_DATE DATE DEFAULT SYSDATE NOT NULL ,                       -- ���� �����
    SCHEDULE_CONTENT VARCHAR2(1000),                              -- ���� ���� ����
    SCHEDULE_PROGRESS NUMBER  DEFAULT 0 NOT NULL,                   -- ���� ����� (%), TBL_TASK�� ����
    SCHEDULE_COLOR VARCHAR2(20) NULL,                             -- ���� ���� (Ķ������)
    SCHEDULE_ALERT CHAR(1)  DEFAULT 'N' NOT NULL,                  -- �˸� ���� ('Y' / 'N')

    CONSTRAINT PK_TBL_SCHEDULE PRIMARY KEY (SCHEDULE_NO),         --  ���� �⺻Ű
    CONSTRAINT UQ_SCHEDULE_UNIQUE UNIQUE (MEMBER_NO, CONTRACT_NO, STATUS_CODE), --  ���� ����ũ ����
    CONSTRAINT FK_SCHEDULE_MEMBER FOREIGN KEY (MEMBER_NO) REFERENCES TBL_MEMBER(MEMBER_NO),
    CONSTRAINT FK_SCHEDULE_CONTRACT FOREIGN KEY (CONTRACT_NO) REFERENCES TBL_CONTRACT(CONTRACT_NO),
    CONSTRAINT FK_SCHEDULE_STATUS FOREIGN KEY (STATUS_CODE) REFERENCES TBL_CONTRACT_STATUS(STATUS_CODE)
);

-- ��࿡ ���� ���� ������ Ķ���� ���·� �����ϱ� ���� ���̺��Դϴ�.
-- �� ������ SCHEDULE_NO�� ���еǸ�, �����(MEMBER_NO)�� ����˴ϴ�.
-- ������ �ݵ�� �ϳ��� ���(CONTRACT_NO)�� ���ϸ�, �����ڵ�(STATUS_CODE)�� ���� ���� ���̺�� �����˴ϴ�.
-- ���� ����, ����, ����/������ �ܿ��� �����(SCHEDULE_PROGRESS)�� ����, �˸� ���� ���� �ð���/����� �Ӽ��� �����մϴ�.
-- ���� ��� �� �ߺ� ���� ������ ���� MEMBER_NO + CONTRACT_NO + STATUS_CODE�� ����ũ ���������� �߰��˴ϴ�.


-- ����/û�� ���̺�
CREATE TABLE TBL_INVOICE (
    INVOICE_NO        VARCHAR2(20) NOT NULL,                       -- û���� ������ȣ
    CONTRACT_NO       VARCHAR2(20) NOT NULL,                       -- ��� ������ȣ
    MEMBER_NO         VARCHAR2(20) NOT NULL,                       -- �ۼ��� ȸ����ȣ
    INVOICE_DEPOSIT   NUMBER NOT NULL,                             -- û�� �ݾ�
    INVOICE_SEND      DATE NOT NULL,                               -- û���� �߼���
    INVOICE_IS_SEND   CHAR(1) DEFAULT 'N' NOT NULL,                -- �߼� ���� ('Y'/'N')
    INVOICE_PAID      DATE,                                        -- �Ա�����
    INVOICE_IS_PAID   CHAR(1) DEFAULT 'N' NOT NULL,                -- �Ա� ���� ('Y'/'N')
    INVOICE_METHOD    VARCHAR2(50) NOT NULL,                       -- ���� ����
    REG_DATE          DATE DEFAULT SYSDATE NOT NULL,               -- û���� ��������

    CONSTRAINT PK_TBL_INVOICE PRIMARY KEY (INVOICE_NO),
    CONSTRAINT FK_INVOICE_CONTRACT FOREIGN KEY (CONTRACT_NO) REFERENCES TBL_CONTRACT(CONTRACT_NO),
    CONSTRAINT FK_INVOICE_MEMBER FOREIGN KEY (MEMBER_NO) REFERENCES TBL_MEMBER(MEMBER_NO)
);


-- û�� ������ �����ϴ� ���� ���̺��Դϴ�.
-- INVOICE_NO�� ���� �⺻Ű�̸�, �� û������ �����ϰ� �ĺ��մϴ�.
-- û������ �ݵ�� ȸ��(MEMBER_NO)�� ���� �ۼ��Ǹ�, ���(CONTRACT_NO)�� ����˴ϴ�.
-- �� ������ ������ û�� ����� ���̺�(TBL_INVOICE_TARGET)�� ���� �����˴ϴ�.
-- û�� �ݾ�, ���� ���, �߼� ����, �Ա� ���� ���� û�� ���� ������ �� ���̺� ��ϵ˴ϴ�.

-- ��������� ���̺�
CREATE TABLE TBL_INVOICE_TARGET (
    ID                    NUMBER PRIMARY KEY,                         -- ���� �ĺ���
    INVOICE_NO            VARCHAR2(20) NOT NULL,                      -- û���� ������ȣ
    CLIENT_NO             VARCHAR2(20),                               -- ���� �� ��ȣ (nullable)
    COMP_CD               VARCHAR2(20),                               -- �ŷ�ó ���� ��ȣ (nullable)
    MEMBER_NO             VARCHAR2(20) NOT NULL,                      -- �� �Ҽ� ȸ��
    INVOICE_CLIENT_NAME   VARCHAR2(200) NOT NULL,                     -- ������ �̸� �Ǵ� ȸ���
    INVOICE_CLIENT_EMAIL  VARCHAR2(200) NOT NULL,                     -- ������ �̸���

    CONSTRAINT FK_TARGET_INVOICE FOREIGN KEY (INVOICE_NO)
        REFERENCES TBL_INVOICE(INVOICE_NO),

    CONSTRAINT FK_TARGET_CLIENT FOREIGN KEY (CLIENT_NO, MEMBER_NO)
        REFERENCES TBL_CLIENT(CLIENT_NO, MEMBER_NO),

    CONSTRAINT FK_TARGET_COMPANY FOREIGN KEY (COMP_CD, MEMBER_NO)
        REFERENCES TBL_COMPANY(COMP_CD, MEMBER_NO)
);

-- û�� ����� ������ �����ϴ� ���̺��Դϴ�.
-- INVOICE_NO�� �������� TBL_INVOICE�� ����Ǹ�, �ϳ��� û������ ���� ���� ���� ������ �� �ֽ��ϴ�.
-- ����ڴ� ���� ��(CLIENT_NO) �Ǵ� �ŷ�ó ����(COMP_CD) �� �ϳ��� �����Ǹ�,
-- ������ ���� �Ҽ� ȸ��(MEMBER_NO)�� ���� ���� ���踦 �����մϴ�.
-- �������� �̸��� �̸����� ���� û���� �߼��� ���� ������ Ȱ��˴ϴ�.
-- CLIENT_NO�� COMP_CD�� ���ÿ� �Էµ��� ������, ���ø����̼� �ܿ��� �� �ʸ� �Էµǵ��� �����ؾ� �մϴ�.


-- �۾����� ���̺�
CREATE TABLE TBL_TASK (
    TASK_NO VARCHAR2(20) NOT NULL,                               -- �۾� ������ȣ
    SCHEDULE_NO VARCHAR2(20) NOT NULL,                           -- ������ ���� ������ȣ
    MEMBER_NO VARCHAR2(20) NOT NULL,                             -- �۾� �����(ȸ�� ������ȣ)
    TASK_TITLE VARCHAR2(100) NOT NULL,                           -- �۾� ����
    TASK_CONTENT VARCHAR2(3000) NOT NULL,                        -- �۾� �� ����
    TASK_DUE DATE,                                               -- �۾� ������
    REG_DATE DATE DEFAULT SYSDATE NOT NULL ,                      -- �۾� �������
    TASK_COMPLETE CHAR(1) DEFAULT 'N' NOT NULL,                  -- �Ϸ� ���� ('Y' / 'N')
    TASK_PRIORITY VARCHAR2(10) DEFAULT '��' NOT NULL,            -- �۾� �켱���� ('��', '��', '��')
    TASK_ALERT DATE,                                             -- �˸� �߼��� (��: ���� �Ϸ� ��)

    CONSTRAINT PK_TBL_TASK PRIMARY KEY (TASK_NO),               
    CONSTRAINT FK_TASK_MEMBER FOREIGN KEY (MEMBER_NO) REFERENCES TBL_MEMBER(MEMBER_NO),
    CONSTRAINT FK_TASK_SCHEDULE FOREIGN KEY (SCHEDULE_NO) REFERENCES TBL_SCHEDULE(SCHEDULE_NO)
);


-- ����(SCHEDULE)�� �Ҽӵ� ���� �۾�(To-Do)�� �����ϴ� ���̺��Դϴ�.
-- TASK_NO�� �۾� ���� �ĺ��ڷ�, ���� �⺻Ű�� �����Ǿ� �ֽ��ϴ�.
-- �� �۾��� ����(SCHEDULE_NO)�� ����Ǹ�, �����(MEMBER_NO) ������ �Բ� ����˴ϴ�.
-- �۾� ����, �� ����, ������(TASK_DUE), �����, �켱����(TASK_PRIORITY), �Ϸ� ����(TASK_COMPLETE) ���� �����մϴ�.
-- TASK_ALERT�� ���� ���� �˸� ����� ���� �Ӽ��Դϴ�.
-- ���� �� ȸ�� ���̺�� �ܷ�Ű�� ����Ǿ� �־� ���� ��� �۾� �帧 ������ �����մϴ�.


--------------------------------------------------------------------------------

-- ����ȣ(CONTRACT_NO) ������
CREATE SEQUENCE SEQ_TBL_CONTRACT_NO START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

-- ������ȣ(CONTRACT_PARTY_NO)
CREATE SEQUENCE SEQ_CONTRACT_PARTY_ID START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

-- �ŷ�ó�ڵ�(COMP_CD) ������
CREATE SEQUENCE SEQ_TBL_COMPANY_CD START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

-- ���ΰ���ȣ(CLIENT_NO) ������
CREATE SEQUENCE SEQ_TBL_CLIENT_NO START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

-- ȸ�ǹ�ȣ(MEETING_NO) ������
CREATE SEQUENCE SEQ_TBL_MEETING_NO START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

-- ȸ��������(MEETING_PARTICIPANT_NO) ������
CREATE SEQUENCE SEQ_MEETING_PARTICIPANT_ID START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

-- ������ȣ(SCHEDULE_NO) ������
CREATE SEQUENCE SEQ_TBL_SCHEDULE_NO START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

-- �۾���ȣ(TASK_NO) ������
CREATE SEQUENCE SEQ_TBL_TASK_NO START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

-- û����ȣ(INVOICE_NO) ������
CREATE SEQUENCE SEQ_TBL_INVOICE_NO START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

-- ��������ڹ�ȣ(INVOICE_TARGET_NO) ������
CREATE SEQUENCE SEQ_INVOICE_TARGET_ID START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

-- �޸��ȣ(MEMO_NO) ������
CREATE SEQUENCE SEQ_TBL_MEMO_NO START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

-- �±׹�ȣ(TAG_NO) ������
CREATE SEQUENCE SEQ_TBL_TAG_NO START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

-- �±� ���� ��ȣ(TAG_MAP_NO) ������
CREATE SEQUENCE SEQ_TBL_TAG_MAP_NO START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;

-- �ŷ�ó ������(CONTACT_IDX) ������
CREATE SEQUENCE SEQ_TBL_COMPANY_MEMBER_IDX START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;


-----------------------------------------------------------------------------------------

-- �ӽ� ��� ������ ����
INSERT INTO TBL_MEMBER (MEMBER_NO, MEMBER_ID, MEMBER_PW, MEMBER_NAME, MEMBER_STATUS, MEMBER_EMAIL, MEMBER_PHONE, JOIN_DATE)
VALUES ('MEM_001', 'user01', '1234', '�ӵ���', 'Y', 'dongju@example.com', '010-1111-2222', SYSDATE-150);

INSERT INTO TBL_MEMBER (MEMBER_NO, MEMBER_ID, MEMBER_PW, MEMBER_NAME, MEMBER_STATUS, MEMBER_EMAIL, MEMBER_PHONE, JOIN_DATE)
VALUES ('MEM_002', 'user02', '1234', '����', 'Y', 'kideok@example.com', '010-3333-4444', SYSDATE-120);

INSERT INTO TBL_MEMBER (MEMBER_NO, MEMBER_ID, MEMBER_PW, MEMBER_NAME, MEMBER_STATUS, MEMBER_EMAIL, MEMBER_PHONE, JOIN_DATE)
VALUES ('MEM_003', 'user03', '1234', '�賲��', 'Y', 'namhoo@example.com', '010-5555-6666', SYSDATE-110);

-- ������ ���� ���� ('A' ����)
INSERT INTO TBL_MEMBER (MEMBER_NO, MEMBER_ID, MEMBER_PW, MEMBER_NAME, MEMBER_STATUS, MEMBER_EMAIL, MEMBER_PHONE, JOIN_DATE)
VALUES ('MEM_004', 'admin', '1234', '������', 'A', 'admin@myjarvis.com', '010-9999-8888', SYSDATE-200);

INSERT INTO TBL_MEMBER (MEMBER_NO, MEMBER_ID, MEMBER_PW, MEMBER_NAME, MEMBER_STATUS, MEMBER_EMAIL, MEMBER_PHONE, JOIN_DATE)
VALUES ('MEM_005', 'user04', '1234', '������', 'Y', 'jihun@example.com', '010-7777-8888', SYSDATE-90);

-- �����Ͱ� �� ������ Ȯ��
COMMIT;


-- �ӽ� �ŷ�ó ������ ����
INSERT INTO TBL_COMPANY (COMP_CD, MEMBER_NO, COMP_TYPE, COMP_NAME, OWNER_NAME, COMP_NO, COMP_TEL, COMP_ADDR, REG_DATE) 
VALUES ('COMP'||LPAD(SEQ_TBL_COMPANY_CD.NEXTVAL, 4, '0'), 'MEM_001', 'C', '(��)������ �ַ��', 'ȫ�浿', '123-45-67890', '02-1111-2222', '����Ư���� ������ ������� 123', SYSDATE);

INSERT INTO TBL_COMPANY (COMP_CD, MEMBER_NO, COMP_TYPE, COMP_NAME, OWNER_NAME, COMP_NO, COMP_TEL, COMP_ADDR, REG_DATE) 
VALUES ('COMP'||LPAD(SEQ_TBL_COMPANY_CD.NEXTVAL, 4, '0'), 'MEM_001', 'C', '����Ʈ �ڵ� ��ī����', '��ö��', '222-33-44556', '031-777-8888', '��⵵ ������ �д籸 �Ǳ����� 235', SYSDATE-10);

INSERT INTO TBL_COMPANY (COMP_CD, MEMBER_NO, COMP_TYPE, COMP_NAME, OWNER_NAME, COMP_NO, COMP_TEL, COMP_ADDR, REG_DATE) 
VALUES ('COMP'||LPAD(SEQ_TBL_COMPANY_CD.NEXTVAL, 4, '0'), 'MEM_002', 'C', '������ ��������', '�̿���', '333-11-55887', '02-3456-7890', '����Ư���� ������ �����źϷ� 402', SYSDATE-25);

INSERT INTO TBL_COMPANY (COMP_CD, MEMBER_NO, COMP_TYPE, COMP_NAME, OWNER_NAME, COMP_NO, COMP_TEL, COMP_ADDR, REG_DATE) 
VALUES ('COMP'||LPAD(SEQ_TBL_COMPANY_CD.NEXTVAL, 4, '0'), 'MEM_003', 'C', '��� ������ƽ��', '������', '444-22-66998', '051-987-6543', '�λ걤���� �ؿ�뱸 ���ҵ��� 57', SYSDATE-40);

INSERT INTO TBL_COMPANY (COMP_CD, MEMBER_NO, COMP_TYPE, COMP_NAME, OWNER_NAME, COMP_NO, COMP_TEL, COMP_ADDR, REG_DATE) 
VALUES ('COMP'||LPAD(SEQ_TBL_COMPANY_CD.NEXTVAL, 4, '0'), 'MEM_001', 'C', '�۷ι� ���� ���', '�ֹ���', '555-33-77119', '032-123-4567', '��õ������ ������ �����þƴ�� 165', SYSDATE-100);

-- �����Ͱ� �� ������ Ȯ��
COMMIT;
select*from tbl_company;


