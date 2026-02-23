package com.stem.chatapp.repository;

import com.stem.chatapp.entity.GroupMembers;
import com.stem.chatapp.entity.GroupMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupMemberRespository extends JpaRepository<GroupMembers, Long> {

    List<GroupMembers> findByUserName(String userName);

    List<GroupMembers> findBygroupName(String groupName);
}
