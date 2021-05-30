import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import s from './styles.scss';
const { Option } = Select;
function ModalAddAccount(props) {
  let { modalAddVisible } = props;
  return (
    <>
      <Modal
        visible={modalAddVisible}
        className={`${s.ModalAddAccount} modalAccount`}
        onOk={() => props.setModalAddVisible(true)}
        onCancel={() => props.setModalAddVisible(false)}
        footer={null}
        centered
        title="アカウント情報を変更"
        closeIcon={
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
            <path d="M441.025,459.5l9.452-9.452a1.785,1.785,0,1,0-2.525-2.525l-9.452,9.452-9.452-9.452a1.785,1.785,0,0,0-2.525,2.525l9.452,9.452-9.452,9.452a1.785,1.785,0,1,0,2.525,2.525l9.452-9.452,9.452,9.452a1.785,1.785,0,0,0,2.525-2.525Z" transform="translate(-426 -447)" />
          </svg>
        }
      >
        <div className="content">
          <Form name="basic" autoComplete="off" className="formAccount">
            <div className="avt-box">
              {/* <img src="" alt="" className="avt avt-round avt110"/> */}
              <span className="label-form">アバター</span>
              <div className="form-group">
                <label htmlFor="uploadAvt" className="labelUpload avt110">
                  <i className="icon">
                    <svg id="Group_3148" data-name="Group 3148" xmlns="http://www.w3.org/2000/svg" width="28.037" height="22.067" viewBox="0 0 28.037 22.067">
                      <path id="Path_15832" data-name="Path 15832" d="M27.1,48.238a3.014,3.014,0,0,0-2.212-.933H20.468v-.053a2.393,2.393,0,0,0-.72-1.732,2.439,2.439,0,0,0-1.732-.72h-8a2.457,2.457,0,0,0-2.479,2.452v.053h-4.4a3.014,3.014,0,0,0-2.212.933A3.168,3.168,0,0,0,0,50.45V63.722a3.014,3.014,0,0,0,.933,2.212,3.168,3.168,0,0,0,2.212.933H24.892a3.014,3.014,0,0,0,2.212-.933,3.169,3.169,0,0,0,.933-2.212V50.45A3.014,3.014,0,0,0,27.1,48.238Zm-.453,15.484h-.027a1.729,1.729,0,0,1-1.732,1.732H3.145a1.729,1.729,0,0,1-1.732-1.732V50.45a1.729,1.729,0,0,1,1.732-1.732H8.288a.717.717,0,0,0,.72-.72v-.773a1,1,0,0,1,1.039-1.039h7.969a1,1,0,0,1,1.039,1.039V48a.717.717,0,0,0,.72.72h5.144a1.729,1.729,0,0,1,1.732,1.732Z" transform="translate(0 -44.8)" fill="#333" />
                      <path id="Path_15833" data-name="Path 15833" d="M118.556,130.8a6.551,6.551,0,1,0,4.637,1.919A6.568,6.568,0,0,0,118.556,130.8Zm3.625,10.207a5.147,5.147,0,0,1-7.249,0,5.1,5.1,0,0,1-1.492-3.625,5.208,5.208,0,0,1,1.492-3.624,5.1,5.1,0,0,1,3.625-1.492,5.208,5.208,0,0,1,3.625,1.492,5.1,5.1,0,0,1,1.492,3.624A4.987,4.987,0,0,1,122.181,141.007Z" transform="translate(-104.538 -125.07)" fill="#333" />
                      <circle id="Ellipse_426" data-name="Ellipse 426" cx="1.306" cy="1.306" r="1.306" transform="translate(22.2 5.703)" fill="#333" />
                    </svg>
                  </i>
                </label>
                <input type="file" name="uploadAvt" id="uploadAvt" className="form-control" />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Form.Item label="名前" name="fullname">
                  <Input placeholder="Full Name" autoComplete="off" />
                </Form.Item>
              </div>
              <div className="col-6">
                <Form.Item label="ロール" name="roll">
                  <Select className="filter-instructor" defaultValue="アドミン" placeholder="Roll">
                    <Option value="jack">Jack</Option>
                    <Option value="アドミン">アドミン</Option>
                    <Option value="tom">Tom</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="col-6">
                <Form.Item label="Status" name="static">
                  <Select className="filter-instructor" defaultValue="active" placeholder="Roll">
                    <Option value="active">
                      <div className="sttClass happening">
                        <i className="icon icon-stt"></i>
                        <span className="text-14 nameStt">Active</span>
                      </div>
                    </Option>
                    <Option value="inactive">
                      <div className="sttClass happened">
                        <i className="icon icon-stt"></i>
                        <span className="text-14 nameStt">Inactive</span>
                      </div>
                    </Option>
                    <Option value="tom">Tom</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="col-6">
                <Form.Item
                  label="電話番号"
                  name="phone"
                  rules={[
                    {
                      type: 'number',
                    },
                  ]}
                >
                  <Input
                    placeholder="Your Phone"
                    autoComplete="off"
                    rules={[
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="col-6">
                <Form.Item label="ロール" name="sex">
                  <Select className="filter-instructor" defaultValue="男性" placeholder="Sex">
                    <Option value="jack">Jack</Option>
                    <Option value="男性">男性</Option>
                    <Option value="tom">Tom</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="col-12">
                <Form.Item
                  label="メール"
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                >
                  <Input placeholder="abc123@example.com" autoComplete="off" />
                </Form.Item>
              </div>
              <div className="col-12">
                <Form.Item className={s.inputPass} label="メール" name="email">
                  <Input.Password placeholder="Password" autoComplete="off" />
                </Form.Item>
              </div>
            </div>

            <div className={s.modal_action}>
              <button className="btn btn-md btn-cancel">削除</button>
              <button className="btn btn-md btn-update">add</button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
}
export default ModalAddAccount;
