import React from 'react';
import { Rate } from 'antd';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

export default class Rater extends React.Component {
  state = {
    value: 3,
  };

  handleChange = value => {
    this.setState({value: Math.floor(value) });
  };

  render() {
    const { value } = this.state;
    return (
      <span>
        <Rate tooltips={desc} allowHalf onChange={this.handleChange} value={value} />
        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
      </span>
    );
  }
}
