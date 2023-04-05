
export const LocalData=(user)=>{
      var detail = JSON.parse(localStorage.getItem('user1') || "[]");
      detail.push(user.data)
      localStorage.setItem("user1",JSON.stringify(detail));

}
