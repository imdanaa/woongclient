import React, { useEffect, useState } from "react";
import AWS from 'aws-sdk'

const S3_BUCKET = 'woongbucket1'
const REGION = 'ap-northeast-2'

function App() {
  const [users, setUsers] = useState([]); // 사용자 데이터를 상태로 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  useEffect(() => {
    fetch("http://localhost:8080/users") // Spring Boot API 호출
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다.");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data); // 데이터를 상태에 저장
        setLoading(false); // 로딩 완료
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 에러가 발생했습니다:", error);
        setError(error.message); // 에러 메시지 저장
        setLoading(false); // 로딩 완료
      });
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // 화면 전체 높이
          fontSize: "1.5rem", // 글씨 크기
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>; // 에러 메시지 표시
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>User List</h1>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "pink" }}>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Age</th>
            <th>Contact Number</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ textAlign: "center" }}>{user.id}</td>
              <td style={{ paddingLeft: "10px" }}>{user.username}</td>
              <td style={{ paddingLeft: "10px" }}>{user.email}</td>
              <td style={{ textAlign: "center" }}>{user.age}</td>
              <td style={{ paddingLeft: "10px" }}>{user.contactNumber}</td>
              <td style={{ paddingLeft: "10px" }}>{new Date(user.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
