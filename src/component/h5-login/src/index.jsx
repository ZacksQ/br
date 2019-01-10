import React from "react";
import './index.scss';
import Button from '@material-ui/core/Button';
import http from './http';
import config from './config'
import Toast from '../../toast';
class ClLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      picCode: "",
      showCodeModal: false,
      getCodeBtnText: "获取验证码",
      isGetingCode: false,
      status: "getcode",
      // 手机号
      valuePhone: "",
      // 验证码
      valueCaptcha: "",
      // 需要图形验证码的时候，同时也需要这个参数，这个参数值在访问图片地址下发的cookie “ImageCode”
      // valueImageCode: '',
      // 验证图形验证码的时候，需要该参数，该参数在接口返回15001的时候返回
      valueApiTicket: '',
      // 图形验证码，一般情况下不需要，该接口返回15001时需要
      valueVerifyCode: '',
      // 附加参数
      valueCallbackParam: {
        invite_code: ''
      }
    };
  }

  componentDidMount() {

  }


  async handelGetCode() {
    if (this.state.isGetingCode) return false;

    if (!this.state.valuePhone || !/^[0-9]{11}$/.test(this.state.valuePhone)) {
      return Toast('', '请输入正确的手机号码')
    }

    // 有图形验证码带上
    const getCodeForm = this.state.valueVerifyCode ? {
      verify_code: this.state.valueVerifyCode,
      api_ticket: this.state.valueApiTicket,
      phone: this.state.valuePhone
    } : {
        phone: this.state.valuePhone,
      };

      this.props.onGetVerifyCode && this.props.onGetVerifyCode(this.state.valuePhone);

    this.handleReset('valueVerifyCode');

    http.post(config.api.getSmsCode, getCodeForm, {
      credentials: 'include'
    }).then(res => {
      if (res.code == 1) {
        this.handleCloseModal();
        this.waitCode();
      } else if (res.code == 15001) {
        this.handleOpenModal();
        const state = this.state;
        state.picCode = res.data.captcha_url;
        state.valueApiTicket = res.data.api_ticket;
        // state.valueImageCode = this.getCookie('ImageCode');
        this.setState(state);
        Toast('', res.msg);
      } else {
        Toast('', res.msg);
      }
    })
  }

  handelSubmit() {
    if (!this.state.valuePhone || !/^[0-9]{11}$/.test(this.state.valuePhone)) {
      return Toast('', '请输入正确的手机号码')
    }

    const data = {
      phone: this.state.valuePhone,
      captcha: this.state.valueCaptcha,
      callback_param: this.state.valueCallbackParam,
    }

    if (this.state.valueVerifyCode) {
      Object.assign(data, {
        verify_code: this.state.valueVerifyCode,
        api_ticket: this.state.valueApiTicket,
      })
    }
    this.handleReset('valueVerifyCode');

    http.post(config.api.postLogin, data).then(res => {
      if (res.code == 1) {

        this.props.onSuccess && this.props.onSuccess(Object.assign(res.data, { phone: this.state.valuePhone }));

        this.setState({
          getCodeBtnText: '获取验证码',
          isGetingCode: false,
        })

        this.handleCloseModal();

      } else if (res.code == 15001) {
        this.handleOpenModal();
        const state = this.state;
        state.status = 'login';
        state.picCode = res.data.captcha_url;
        state.valueApiTicket = res.data.api_ticket;
        this.setState(state);
        console.log(this.state)
      } else {
        Toast('', res.msg)

      }
    })
  }

  handleRefreshCode() {
    this.setState({
      picCode: `${this.state.picCode}&t=${+new Date()}`
    })
  }

  handleCloseModal() {
    this.setState({ showCodeModal: false });
  }

  handleOpenModal() {
    this.setState({ showCodeModal: true });
  }

  handleReset(name) {
    this.setState({
      [name]: ''
    })
  }

  waitCode() {
    let clock = 60;
    this.setState({
      isGetingCode: true,
    })
    const timer = setInterval(() => {
      if (clock > 0 && this.state.isGetingCode) {
        this.setState({
          getCodeBtnText: --clock
        })
      } else {
        clearInterval(timer);
        this.setState({
          getCodeBtnText: '获取验证码',
          isGetingCode: false,
        })
      }
    }, 1000)

  }


  handelInputChange(e, name) {

    this.setState({
      [name]: e.target.value
    })
  }

  renderBox(content, red) {
    return (
      <div className={'box' + (red ? ' red' : '')}>
        <div className='box-contain flex-center'>{content}</div>
      </div>
    )
  }

  onInputBlur(){
    window.scrollTo(0, 0);
  }


  render() {
    return (
      <div id="cl-h5-login" className='cl-h5-login' onClick={(e)=>{
        if(e.target.className === e.currentTarget.className){
          this.props.onClose && this.props.onClose();
        }
      }}>
        <div className='form-wrap'>
          <div className="form-dotted">
            <div className='form-solid'>
              <section className="form">
                {
                  this.renderBox(
                    <React.Fragment>
                      <input type="tel" onChange={e =>
                        this.handelInputChange(e, 'valuePhone')} placeholder="请输入手机号码" maxLength="11"
                        onBlur={this.onInputBlur.bind(this)}
                        value={this.state.valuePhone} />
                      {
                        this.state.valuePhone.length > 0 && <i className="reset" onClick={this.handleReset.bind(this, 'valuePhone')}></i>
                      }
                    </React.Fragment>
                  )
                }
                {this.state.showCodeModal && this.state.status == 'getcode' ? (
                  <div className="form-group">
                    {this.renderBox(
                      <input
                        className="code-input"
                        type="text"
                        onChange={e => this.handelInputChange(e, 'valueVerifyCode')}
                        onBlur={this.onInputBlur.bind(this)}
                        placeholder="图形验证码"
                      />
                    )}
                    {/* <span className="refresh" onClick={this.handleRefreshCode.bind(this)}>刷新</span> */}
                    <img className="pic-code" onClick={this.handleRefreshCode.bind(this)} src={this.state.picCode} alt="" />
                  </div>
                ) : null}

                <div className="form-group">
                  {this.renderBox(
                    <input
                      className="code-input"
                      id="captcha"
                      type="tel"
                      onChange={e => this.handelInputChange(e, 'valueCaptcha')}
                      onBlur={this.onInputBlur.bind(this)}
                      maxLength="6"
                      placeholder="请输入验证码"
                    />
                  )}
                  {this.renderBox(
                    <button
                      className={
                        !this.state.isGetingCode ? "getcode" : "getcode clock-disable"
                      }
                      onClick={this.handelGetCode.bind(this)}
                    >
                      {this.state.getCodeBtnText}
                    </button>,
                    true
                  )}
                </div>
                {this.state.showCodeModal && this.state.status == 'login' ? <div className="form-group">
                  {this.renderBox(
                    <input
                      className="code-input"
                      type="text"
                      onChange={e => this.handelInputChange(e, 'valueVerifyCode')}
                      onBlur={this.onInputBlur.bind(this)}
                      placeholder="图形验证码"
                    />
                  )}
                  {/* <span className="refresh" onClick={this.handleRefreshCode.bind(this)}>刷新</span> */}
                  <img className="pic-code" onClick={this.handleRefreshCode.bind(this)} src={this.state.picCode} alt="" />
                </div> : null}

                <div className='fomr-line'>未注册车轮APP将默认注册</div>
              </section>
            </div>
          </div>

          <Button className='submit-wrap'>
            <div
              className="submit"
              onClick={this.handelSubmit.bind(this)}
            >
              立即登录
            </div>
          </Button>

        </div>
      </div>
    );
  }
}


export default ClLogin;