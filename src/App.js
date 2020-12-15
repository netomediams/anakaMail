import React, { useState } from 'react'
//components
import Header from './components/Header';
import Footer from './components/Footer';
import Editor from './components/Editor';
import ThemePicker from './components/ThemePicker';
import ThemeNP1 from './components/ThemeNp1';
import ThemeNP2 from './components/ThemeNp2';
// libs
import {debounce} from 'lodash';


function App() {

  // form state
  const [data, setData] = useState({
    name: '',
    title: '',
    phone: '',
    fax: '',
    website: {
      name: '',
      link: ''
    },
    address: '',
    social: {
      fb: {
        link: '',
        icon: 'https://github.com/anakatech-kaykostadinov/mailsig/blob/main/src/images/filled_icons/facebook%20(1).png?raw=true'
      },
      ig: {
        link: '',
        icon: 'https://github.com/anakatech-kaykostadinov/mailsig/blob/main/src/images/filled_icons/instagram%20(1).png?raw=true'
      },
      linkedin: {
        link: '',
        icon: 'https://github.com/anakatech-kaykostadinov/mailsig/blob/main/src/images/filled_icons/linkedin%20(1).png?raw=true'
      },
    }
  })


  const [selected, setSelected] = useState('nm');

  // copy button functionality
  const [copied, setCopied] = useState('');
  const [btn, setBtn] = useState({
    class: '',
    message: 'Copy'
  });

  const copyToClipboard = debounce(() => {
    const table = document.getElementById('table-content');
    let range = document.createRange();
    range.selectNodeContents(table);
    let select = window.getSelection();
    select.removeAllRanges();
    select.addRange(range);
    document.execCommand('copy');
    select.removeRange(range);

    //btn animation
    setBtn({
      class: 'copy-btn--success',
      message: 'Copied to clipboard'
    });
    setCopied('table--success');

    setTimeout(() => {
      setBtn({
        class: '',
        message: 'Copy'
      });
      setCopied('');
    }, 2000);

  }, 200); // debounce timeout

  

  return (
    <div className="ms-main">
      <Header />
      <ThemePicker selected={selected} setSelected={setSelected} />
      <main>
        <Editor data={data} setData={setData} />
        <section className="preview-col">
          <button className={`copy-btn ${btn.class}`} disabled={btn.class != '' ? true : false} onClick={copyToClipboard}>
            <i className={btn.class == '' ? 'far fa-copy' : 'fas fa-check'} ></i> {btn.message}
          </button>
          <div className='form-container'>
            {
              (()=> {
                switch (selected) {
                  case 'nm':
                    return <ThemeNP1 data={data} copied={copied} />
                  case 'np':
                    return <ThemeNP2 data={data} copied={copied} />
                  default:
                    break;
                }
              })()
            }
          </div>
          <div style={{ maxWidth: '90vw', padding: '0 2em', textAlign: 'center'}}>
            <p>
              Note: Items may appear displaced. This preview is not representative of the signature's appearance in emails.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


export default App;
