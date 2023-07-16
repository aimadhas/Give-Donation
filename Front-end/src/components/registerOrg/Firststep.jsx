import Input from '../UI/input'
import Inputwraper from '../UI/inputwraper'
export default  function Firststep(props) {
    const data = props.data
return(
    <div className='w-[70%] max-lg:w-full'>
        <Inputwraper>
        <label htmlFor="">Organization name</label>
        <Input type="text" placeholder='Organisation' name='org_name' onChange={data.handleChange}  value={data.values.org_name} onBlur={data.handleBlur} className={`${data.errors.org_name && data.touched.org_name?'border-red-600':''}`}/>
        {data.errors.org_name && data.touched.org_name && <p className="text-red-700">{data.errors.org_name}</p>}
        </Inputwraper>
        <Inputwraper>
        <label htmlFor="">Email</label>
        <Input type="email" placeholder='User@gmail.com' name='email' onChange={data.handleChange}  value={data.values.email} onBlur={data.handleBlur} className={`${data.errors.email && data.touched.email?'border-red-600':''}`} />
        {data.errors.email && data.touched.email && <p className="text-red-700">{data.errors.email}</p>}
        </Inputwraper>
        <Inputwraper>
        <label htmlFor="">Password</label>
        <Input type="password" placeholder='Enter your password'name='password' onChange={data.handleChange}  value={data.values.password} onBlur={data.handleBlur} className={`${data.errors.password && data.touched.password?'border-red-600':''}`} />
        {data.errors.password && data.touched.password && <p className="text-red-700">{data.errors.password}</p>}
        </Inputwraper>
        <Inputwraper>
        <label htmlFor="">confirm password</label>
        <Input type="password" placeholder='Confirm your password'  name='confirmPassword' onChange={data.handleChange}  value={data.values. confirmPassword} onBlur={data.handleBlur} className={`${data.errors. confirmPassword && data.touched. confirmPassword?'border-red-600':''}`}/>
        {data.errors. confirmPassword && data.touched. confirmPassword && <p className="text-red-700">{data.errors. confirmPassword}</p>}
        </Inputwraper>
    </div>
)
}