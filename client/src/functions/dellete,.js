export const deleteMember = (members,setMembers,id) =>{
    const tempArray = members.filter(mem =>{
        return mem.user._id != id;
    })
    setMembers(() => [...tempArray])
}