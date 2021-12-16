const sub = (e)=>{
    console.log(e.target);
    const name = document.querySelector("input[name='name']").value;
    alert(name);
    localStorage.setItem("name",name);
}
window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("sub").addEventListener('click',(e)=>sub(e));
    document.querySelector("input[name='name']").value = localStorage.getItem('name');
});
