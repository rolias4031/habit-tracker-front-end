function LoginButton (props) {
  return (
    <button onClick={clickHandler} className="btn btn-dark btn-sm" type="button" name="button">{props.btnState}</button>
  )

  function clickHandler () {
    props.setAppMode((prevState) => {
      return { create: false, login: true }
    })
  }
}

export default LoginButton
