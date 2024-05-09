import { useContext } from 'react'
import avatar from '../../assets/avatar.svg'
import { GroupContext } from '../../context/groupChatContext'
import { deleteMember } from '../../functions/dellete,';
export default function SelectedUsers () {
  const { members, setMembers } = useContext(GroupContext);

if(members.length < 1){
  return <div
  style={{  
    borderBottom : '1px solid gray',
    textAlign : 'center',
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center'

    
  }}

  > No members selected yet......</div>
}{
  return (
    <div
      style={{  
        display: 'flex',
        flexDirection: 'row',
        flexWrap : 'no-wrap',
        borderBottom : '1px solid gray',
        overflowX : 'auto',
        scrollbarWidth : 'none'
        
      }}
      className='scroll'
      
  
    >
      {members &&
        members.map((mem, i) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              fontSize: '0.8em',
              position: 'relative',
              padding : '1rem'
            }}
            key={i}
          >
            <img src={avatar} alt='avatar' height='50px' />
            <p>{mem?.user?.name}</p>
            <svg
            onClick={()=>{
              deleteMember(members,setMembers,mem?.user?._id);
              
            }
            }

            style={{
                position : 'absolute',
                left : '55%',
                top : '50%',
                cursor : 'pointer',
              
            }}
      
      
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              fill='currentColor'
              className='bi bi-x scale'
              viewBox='0 0 16 16'
            >
              <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708' />
            </svg>
          </div>
        ))}
    </div>
  )

}
  
}
