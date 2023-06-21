import { Layout } from 'antd';
import './layout.css';
import { Link } from 'react-router-dom';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

function LayoutEl(){

    const { Content } = Layout;

    const { t } = useTranslation();
    const handleChangeLanguage = (value) => {
      i18n.changeLanguage(value);
    };

    return(
        <Layout className='layout'>
            <Content className='content'>
                <Link to="/Test1">
                    <div className='box test1'>
                        <div className='text'>
                            <h3>{t('Test 1')}</h3>
                            <p className='text-box1'>{t('Layout & Style')}</p>
                        </div>  
                    </div>
                </Link>
                    
                <Link to="">
                    <div className='box test2'>
                        <div className='text'>
                            <h3>{t('Test 2')}</h3>
                            <p className='text-box2'>{t('Connect API')}</p>
                        </div>  
                    </div>
                </Link>
                    
                <Link to="/Forms">
                    <div className='box test3'>
                        <div className='text'>
                            <h3>{t('Test 3')}</h3>
                            <p className='text-box3'>{t('Form & Table')}</p>
                        </div>  
                    </div>
                </Link>

                <div className='lang-c'>
                    <Select
                        defaultValue={'en'}
                        style={{
                            width: 120,
                        }}
                        options={[
                            {
                            value: 'en',
                            label: 'EN',
                            },
                            {
                                value: 'th',
                                label: 'TH',
                            },
                        ]}
                        onChange={handleChangeLanguage}
                    />
                </div>

            </Content>
        </Layout>
    );
}

export default LayoutEl;