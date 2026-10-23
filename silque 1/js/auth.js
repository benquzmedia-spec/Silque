/* Silque Tours — Authentication */
window.SILQUE = window.SILQUE || {};
window.SILQUE.AUTH = (function(){
  let ADMIN_PW = '1Ningulu20Muno@%';
  try { ADMIN_PW = localStorage.getItem('silqueAdminPw') || ADMIN_PW; } catch(e){}
  let failedAttempts = 0, resetCode = null, pwdResetActive = false;

  function isMobile(){ return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent); }
  function isAdminAccessAllowed(){ return !isMobile(); }

  function getDeviceId(){
    let id = localStorage.getItem('silqueDeviceId');
    if(!id){
      id = 'dev-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8);
      localStorage.setItem('silqueDeviceId', id);
      const D = window.Silque ? window.Silque.state : null;
      if(D){
        const devices = D.devices || [];
        devices.push({id, type: isMobile() ? 'mobile' : 'desktop', name: navigator.platform+' · '+(isMobile()?'Mobile':'PC'), added: new Date().toISOString()});
        D.devices = devices;
        window.Silque.save();
      }
    }
    return id;
  }

  function openAdminLogin(){
    if(!isAdminAccessAllowed()){ window.Silque.toast('❌ Admin access is desktop only'); return; }
    document.getElementById('adminLogin').classList.add('on');
    document.getElementById('adminPwd').value = '';
    document.getElementById('pwdErr').classList.remove('on');
    pwdResetActive = false;
    document.body.style.overflow = 'hidden';
    setTimeout(()=>document.getElementById('adminPwd').focus(), 150);
    const devId = getDeviceId();
    const D = window.Silque.state;
    const devs = D.devices || [];
    const el = document.getElementById('deviceInfo');
    if(el) el.textContent = 'Device '+(devs.findIndex(d=>d.id===devId)+1)+' of '+devs.length;
  }

  function closeAdminLogin(){
    if(pwdResetActive){
      document.getElementById('loginStep').style.display = 'block';
      document.getElementById('resetStep').classList.remove('on');
      pwdResetActive = false;
    }
    document.getElementById('adminLogin').classList.remove('on');
    document.getElementById('adminPwd').value = '';
    document.getElementById('pwdErr').classList.remove('on');
    document.body.style.overflow = '';
  }

  function togglePwd(){
    const p = document.getElementById('adminPwd'), ic = document.getElementById('pwdIcon');
    if(p.type === 'password'){ p.type = 'text'; ic.className = 'fas fa-eye-slash'; }
    else { p.type = 'password'; ic.className = 'fas fa-eye'; }
  }

  function tryUnlock(){
    if(document.getElementById('adminPwd').value === ADMIN_PW){
      failedAttempts = 0;
      closeAdminLogin();
      window.Silque.openAdmin();
    } else {
      failedAttempts++;
      const err = document.getElementById('pwdErr');
      err.textContent = 'Incorrect. Attempt '+failedAttempts+' of 5.';
      err.classList.add('on');
      document.getElementById('adminPwd').value = '';
      document.getElementById('adminPwd').focus();
      if(failedAttempts >= 5) setTimeout(openPwdReset, 1200);
    }
  }

  function openPwdReset(){
    document.getElementById('loginStep').style.display = 'none';
    document.getElementById('resetStep').classList.add('on');
    document.getElementById('resetStep1').classList.add('on');
    document.getElementById('resetStep2').classList.remove('on');
    document.getElementById('resetStep3').classList.remove('on');
    pwdResetActive = true;
  }
  function closeReset(){
    document.getElementById('loginStep').style.display = 'block';
    document.getElementById('resetStep').classList.remove('on');
    pwdResetActive = false;
    failedAttempts = 0;
  }
  function sendReset(method){
    resetCode = String(Math.floor(1000 + Math.random() * 9000));
    console.log('🔑 [DEMO] Reset code:', resetCode);
    document.getElementById('resetStep1').classList.remove('on');
    document.getElementById('resetStep2').classList.add('on');
    document.getElementById('resetSentMsg').textContent = method === 'email' ? 'An email has been sent with a 4-digit verification code.' : 'An OTP has been sent to your phone with a 4-digit verification code.';
    window.Silque.toast('📧 Code sent');
  }
  function verifyReset(){
    if(document.getElementById('resetCode').value.trim() === resetCode){
      document.getElementById('resetStep2').classList.remove('on');
      document.getElementById('resetStep3').classList.add('on');
      document.getElementById('resetErr').classList.remove('on');
    } else {
      document.getElementById('resetErr').classList.add('on');
      document.getElementById('resetCode').value = '';
    }
  }
  function changePassword(){
    const p1 = document.getElementById('newPwd').value, p2 = document.getElementById('newPwdConfirm').value, err = document.getElementById('newPwdErr');
    if(p1.length < 6){ err.textContent = 'Min 6 characters.'; err.classList.add('on'); return; }
    if(p1 !== p2){ err.textContent = 'Passwords do not match.'; err.classList.add('on'); return; }
    ADMIN_PW = p1;
    try { localStorage.setItem('silqueAdminPw', p1); } catch(e){}
    window.Silque.toast('✅ Password changed!');
    failedAttempts = 0;
    closeAdminLogin();
  }
  function changeAdminPassword(){
    const cur = document.getElementById('secCurPwd').value, np = document.getElementById('secNewPwd').value, cp = document.getElementById('secConfirmPwd').value;
    if(cur !== ADMIN_PW){ window.Silque.toast('❌ Wrong current password'); return; }
    if(np.length < 6){ window.Silque.toast('❌ Min 6 characters'); return; }
    if(np !== cp){ window.Silque.toast('❌ Passwords do not match'); return; }
    ADMIN_PW = np;
    try { localStorage.setItem('silqueAdminPw', np); } catch(e){}
    document.getElementById('secCurPwd').value = '';
    document.getElementById('secNewPwd').value = '';
    document.getElementById('secConfirmPwd').value = '';
    window.Silque.toast('✅ Password changed!');
  }

  return { openAdminLogin, closeAdminLogin, togglePwd, tryUnlock, openPwdReset, closeReset, sendReset, verifyReset, changePassword, changeAdminPassword, getDeviceId, isAdminAccessAllowed, get pwdResetActive(){return pwdResetActive;}, getPassword:()=>ADMIN_PW };
})();