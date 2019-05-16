import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import Cover from './Cover';
import PicturesWall from './ImageWall';

const chinese=['一','二','三','四','五','六','七','八','九','十','十一','十二'];
let id = 0;

class DynamicFieldSet extends React.Component {
  state={

  }
  handleChildChange=(type,value)=>{
  
  }
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log('Received values of form: ', values);
        console.log('Merged values:', keys.map(key => names[key]));
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...formItemLayout}
        label={`步骤${chinese[index]}`}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "请输入该步骤或者把它删除！",
            },
          ],
        })(<Input placeholder="请详细输入该条步骤！" style={{ width: '80%', marginRight: 8 }} />)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
        {...formItemLayout}
        label={'上传一张封面！'}
        required={false}
        key='cover'
        >
        <Cover handleValue={this.handleChildChange}/>
        </Form.Item>
        <Form.Item
        {...formItemLayout}
        label={'分步骤图片！'}
        required={false}
        key='pictures'
        >
        <PicturesWall handle={this.handleChildChange}/>
        </Form.Item>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '40%' }}>
            <Icon type="plus" /> 增加步骤
          </Button>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">
            提交菜谱
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);