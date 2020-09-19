import React from 'react'


class ClassComponent extends React.Component<{ name: String }> {
    state = {
        name: 'Mundo!!!'
    }

    render() {
        return <div>
            <p>name: { this.state.name }</p>
            <button onClick={() => {
                this.setState({ name: 'Daniel' })
            }}>Click me</button>
        </div>
    }
}

export default ClassComponent