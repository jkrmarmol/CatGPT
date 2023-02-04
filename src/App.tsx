import { useState, useEffect, useRef } from 'react'
import { BiPaperPlane } from 'react-icons/bi'
import UserAvatar from './assets/user-icon.jpg';
import MeowSupportAvatar from './assets/midjourney_cat.webp'
import { useAppDispatch, useAppSelector } from './hook/useTypedSelector';
import { sendMessage } from './hook/meowSlices';
import './assets/style.css'

function App() {
  const dispatch = useAppDispatch();
  const selectMeow = useAppSelector(state => state.meow)
  const inputForm = useRef<string | any>('');
  const scrollDown = useRef<string | any>('');

  const Typewriter = ({ sentence }: { sentence: string }) => {
    const [index, setIndex] = useState(0);
    const [text, setText] = useState("");

    useEffect(() => {
      let intervalId = setInterval(() => {
        if (index >= sentence.length) {
          clearInterval(intervalId);
          return;
        }
        setText(text => text + sentence[index]);
        setIndex(index + 1);
      }, 30);


      return () => clearInterval(intervalId);
    }, [index]);

    return <p>{text}</p>;
  };

  const meowMessages = () => {
    let paragraph = "";
    for (let i = 0; i < Math.floor(Math.random() * (120 - 3 + 1)) + 3; i++) {
      paragraph += "meow ";
    }
    return paragraph;
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    const humanMessage = {
      avatar: 'human',
      message: inputForm.current.value
    };
    const catMessage = {
      avatar: 'cat',
      message: meowMessages()
    };
    console.log(catMessage)
    dispatch(sendMessage(humanMessage))
    dispatch(sendMessage(catMessage))
  }

  useEffect(() => {
    scrollDown.current.scrollIntoView({ behavior: "smooth" });
  })

  return (
    <>
      <div className='container'>
        <div className="context">
          <div className="gpt-header">
            <h1>CatGPT</h1>
            <p>meow meow!!</p>
          </div>
          <ul>
            {selectMeow.map((e, index) => {
              if (e.avatar === 'human') {
                return (
                  <>
                    <li key={index}>
                      <img src={UserAvatar} alt='User Avatar' />
                      <p className='user-input-text'>{e.message}</p>
                    </li>
                  </>
                );
              } else {
                const lastArray = selectMeow[selectMeow.length - 1];
                if (lastArray.message === e.message) {
                  return (
                    <>
                      <li key={index} className='computer-input'>
                        <img src={MeowSupportAvatar} alt="Cat Avatar" />
                        <p className="computer-input-text">{<Typewriter sentence={e.message} />}</p>
                      </li>
                    </>
                  );
                }
                return (
                  <>
                    <li key={index} className='computer-input'>
                      <img src={MeowSupportAvatar} alt="Cat Avatar" />
                      <p className="computer-input-text">{e.message}</p>
                    </li>
                  </>
                );
              }
            })}
          </ul>
          <div ref={scrollDown}></div>
        </div>

        <div className="user-text">
          <div>
            <input
              type="text"
              name="question"
              ref={inputForm}
              onKeyUp={(e) => e.key === 'Enter' ? onSubmit(e) : null}
            />
            <button type='button' onClick={onSubmit}>
              <BiPaperPlane
                style={{
                  color: 'rgb(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  margin: 10,
                  fontSize: '1.5rem'
                }}
              />
            </button>
          </div>

          <p>Developed by <a href="https://github.com/jkrmarmol">Kurt Russelle Marmol</a>, this chat interface is powered by OpenAI's ChatGPT technology, providing innovative meow-filled responses through advanced language processing. Meow meow!</p>
        </div>
      </div>
    </>
  )
}

export default App
