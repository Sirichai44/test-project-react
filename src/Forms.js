import React, { useState, useEffect } from "react";
import { Input, Select, Form, Radio, Table, Button, Modal } from 'antd';
import './Forms.css';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addData, deleteData, updateData } from "./store/dataSlice";
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

function Forms(){

    const { t } = useTranslation();
    const handleChangeLanguage = (value) => {
      i18n.changeLanguage(value);
    };

    const [typeName, setTypeName] = useState(JSON.parse(localStorage.getItem('colData')).typeName || '');
    const [name, setName] = useState(JSON.parse(localStorage.getItem('colData')).name || '');
    const [surname, setSurname] = useState(JSON.parse(localStorage.getItem('colData')).surname || '');
    const [date, setDate] = useState(JSON.parse(localStorage.getItem('colData')).date || '');
    const [typeNation, setNation] = useState(JSON.parse(localStorage.getItem('colData')).typeNation || '');
    const [typeSex, setTypeSex] = useState(JSON.parse(localStorage.getItem('colData')).typeSex || '');
    const [salary, setSalary] = useState(JSON.parse(localStorage.getItem('colData')).salary || '');
    const [phone, setPhone] = useState(JSON.parse(localStorage.getItem('colData')).phone || { phone1: '66', phone2: '' });
    const [idcard, setId] = useState(JSON.parse(localStorage.getItem('colData')).idcard || { id1_1: '', id1_2: '', id1_3: '', id1_4: '', id1_5: '' });
    const [id2, setId2] = useState(JSON.parse(localStorage.getItem('colData')).id2 || '');


    const counts = useSelector((state) => state.items.items)
    const dispatch = useDispatch();

    const clearBtn = ()=>{
        setTypeName('');
        setName('');
        setSurname('');
        setDate('');
        setNation('');
        setTypeSex('');
        setSalary('');
        setPhone({ phone1: '', phone2: '' })
        setId('');
        setId2('');
    };

    const [data, setData] = useState([]);
    const [editingData, setEditingData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleEdit = (record) => {
        // console.log(record);
        setEditingData(record);
        setIsModalVisible(true);
    };
    
    const handleSave = () => {
        dispatch(updateData({ key: editingData.key, newData: editingData }));
        setIsModalVisible(false);
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const columns = [
        {
          key: "1",
          title: "ชื่อ",
          dataIndex: "name",
          editable: true,
          sorter:(a,b) => a.name - b.name
        },
        {
          key: "2",
          title: "เพศ",
          dataIndex: "typeSex",
          editable: true,
          sorter:(a,b) => a.typeSex - b.typeSex
        },
        {
          key: "3",
          title: "หมายเลขโทรศัพท์มือถือ",
          dataIndex: "phone",
          editable: true,
          sorter:(a,b) => a.phone - b.phone
        },
        {
          key: "4",
          title: "สัญชาติ",
          dataIndex: "typeNation",
          editable: true,
          sorter:(a,b) => a.typeNation - b.typeNation
        },
        {
          key: "5",
          title: "จัดการ",
          render: (_, record) => (
            <div>
                <Button  onClick={() => handleEdit(record)} size="small">
                แก้ไข
                </Button>
                <Button
                    onClick={() => handleDelete(record.key)}
                    danger
                    size="small"
                >
                    ลบ
                </Button>
            </div>
            )
        },
    ];


    useEffect(() => {
        const newcounts = {
            typeName,
            name,
            surname,
            date,
            typeNation,
            typeSex,
            salary,
            phone,
            idcard,
            id2
        };
        localStorage.setItem('colData', JSON.stringify(newcounts));
    }, [typeName, name, surname, date, typeNation, typeSex, salary, phone, idcard, id2]);


    const handleInput = function(e){
        setPhone({
            ...phone, 
            [e.target.name]: e.target.value
        });
    };
    const handleSelect = function(value) {
        setPhone({
            ...phone,
            phone1: value
        });
    };
    const sumphone = phone.phone1+phone.phone2

    const handleInput2 = function(e){
        setId({
            ...idcard, 
            [e.target.name]: e.target.value
        });
    };
    const sumid = idcard.id1_1+idcard.id1_2+idcard.id1_3+idcard.id1_4+idcard.id1_5

    const handleAddData = () => {
        const newId = counts.length + 1;
        const newData = {
            key: newId,
            typeName,
            name,
            surname,
            date,
            typeNation,
            salary,
            typeSex,
            phone: sumphone,
            idcard: sumid,
            id2
        };
    
        dispatch(addData(newData));
        clearBtn();
    };
    const handleDelete = (key) => {
        dispatch(deleteData(key));
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    
    const handleChangePage = (page, pageSize) => {
      setCurrentPage(page);
    };
    
    const handleChangePageSize = (current, size) => {
      setCurrentPage(1);
      setPageSize(size);
    };

    const paginationConfig = {
      current: currentPage,
      pageSize: pageSize,
      total: counts.length,
      onChange: handleChangePage,
      onShowSizeChange: handleChangePageSize,
    };

    
    const options = ['','นาย','นางสาว','นาง','อื่นๆ'];
    const nations = ['ไทย','อื่นๆ'];
    const phonesType = ['66','77','88'];

    
    return(
        <div>
            <Form onfi className="form-container">
                <div className='App'>
                    <h1>{t('Form & Table')}</h1>
                    <div className='Container'>
                        <div>
                            <div className='input typename'>
                                <label>คำนำหน้า:</label>
                                <Select onChange={(e) => setTypeName(e)} value={typeName}>
                                    {options.map((option, index) =>{
                                        return <Select.Option key={index} value={option}></Select.Option>
                                    })}
                                </Select>
                            </div>

                            <div className='input name'>
                                <label>ชื่อจริง:</label>
                                <Input className='names' 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            
                            <div className='input surname'>
                                <label>นามสกุล:</label>
                                <Input className='surnames' 
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                />
                            </div> 
                        </div>
            
                        <div>          
                            <div className='input bd'>
                                <label>วันเกิด:</label>
                                <Input type="date" 
                                    className="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                
                            <div className='input nation'>
                                <label>สัญชาติ:</label>
                                <Select 
                                    placeholder='-- กรุณาเลือก --' 
                                    className='nation'  
                                    onChange={(e) => setNation(e)}
                                    value={typeNation}
                                >
                                    {nations.map((nation,index)=>{
                                    return <Select.Option key={index} value={nation}></Select.Option>
                                    })}
                                </Select>
                            </div>
                        </div>
            
                        <div className='input id'>
                            <label>เลขบัตรประชาชน:</label>
                            <Input maxLength='3'  name='id1_1' onChange={handleInput2} value={idcard.id1_1}/>
                            <span>-</span>
                            <Input maxLength='2'  name='id1_2' onChange={handleInput2} value={idcard.id1_2}/>
                            <span>-</span>
                            <Input maxLength='5'  name='id1_3' onChange={handleInput2} value={idcard.id1_3} />
                            <span>-</span>
                            <Input maxLength='2'  name='id1_4' onChange={handleInput2} value={idcard.id1_4} />
                            <span>-</span>
                            <Input maxLength='1'  name='id1_5' onChange={handleInput2} value={idcard.id1_5} />
                        </div>
                        
                        <div className='input sex'>
                            <label>เพศ:</label>
                            <Radio.Group className='radio' onChange={(e) => setTypeSex(e.target.value)}>
                                <Radio value='ผู้ชาย'>ผู้ชาย</Radio>
                                <Radio value='ผู้หญิง'>ผู้หญิง</Radio>
                                <Radio value='ไม่ระบุ'>ไม่ระบุ</Radio>
                            </Radio.Group>
                        </div>

                        <div className='input phone'>
                            <div>
                                <label>หมายเลขโทรศัพท์มือถือ:</label>
                                <Select className="phones" name='phone1' onChange={handleSelect} value={phone.phone1}>
                                    {phonesType.map((phoneType, index) =>{
                                        return <Select.Option key={index} value={phoneType}></Select.Option>
                                    })}
                                </Select>
                                <span>-</span>
                                <div>
                                    <Input type="number" name='phone2' onChange={handleInput} value={phone.phone2} />
                                </div>
                            </div>

                            
                        </div>

                        <div className="id2">
                            <label>หนังสือเดินทาง:</label>
                            <Input type="number" onChange={(e)=>setId2(e.target.value)}/>
                        </div>

                        <div className="salary">
                            <div>
                                <label>เงินเดือนที่คาดหวัง:</label>
                                <Input type="number" className="salary-input" 
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                />
                            </div>
                            <div className="btn-form">
                                <button 
                                    className="clear"
                                    onClick={clearBtn}
                                >
                                    ล้างข้อมูล
                                </button>
                                <button 
                                    className="submit"
                                    onClick={handleAddData}>ส่งข้อมูล
                                </button>
                            </div>
                        </div>
            
                    </div>
                </div> 
            </Form>

            <div className='lang-c'>
                <Select
                    defaultValue="en"
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

            <div className="home-btn">
                <Link to="/">
                    <div>
                        <button className="home">Home</button>
                    </div>
                </Link>
            </div>
                
            <Table
                className="dataTable"
                columns={columns}
                dataSource={counts}
                rowSelection={{
                    type: 'checkbox',
                }}
                pagination={paginationConfig}

            >
            </Table>
            <Modal
                title="แก้ไขข้อมูล"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleSave}
            >
                <label>ชื่อ:</label><br></br>
                <Input
                    name="name"
                    value={editingData?.name}
                    onChange={handleChange}
                />

                <label>เพศ:</label><br></br>
                <Radio.Group 
                    className='radio' 
                    onChange={(e) => setTypeSex(e.target.value)}
                >
                    <Radio value='ผู้ชาย'>ผู้ชาย</Radio>
                    <Radio value='ผู้หญิง'>ผู้หญิง</Radio>
                    <Radio value='ไม่ระบุ'>ไม่ระบุ</Radio>
                </Radio.Group><br></br>

                <label>สัญชาติ:</label><br></br>
                <Select
                    style={{ width: 200 }}
                    placeholder='-- กรุณาเลือก --'
                    className='sex'
                    onChange={(value) => {
                        setEditingData((prevData) => ({
                          ...prevData,
                          typeNation: value,
                        }));
                    }}
                    value={editingData?.typeNation}
                >
                    {nations.map((option, index) =>{
                        return <Select.Option key={index} value={option}></Select.Option>
                    })}
                </Select><br></br>

                <label>หมายเลขโทรศัพท์มือถือ:</label>
                <Input
                    name="phone"
                    value={editingData?.phone}
                    onChange={handleChange}
                />
            </Modal>

        </div>
        
    );

}

export default Forms;